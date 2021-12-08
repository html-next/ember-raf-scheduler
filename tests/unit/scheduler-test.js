import { module, test } from 'qunit';
import { scheduler, Token } from 'ember-raf-scheduler';
import { settled } from '@ember/test-helpers';

module('scheduler');

test('it works', async function (assert) {
  assert.expect(1);

  scheduler.schedule('sync', () => {
    assert.ok('scheduled function runs correctly');
  });

  await settled();
});

test('it runs scheduled tasks in the correct order', async function (assert) {
  assert.expect(5);

  let callCount = 0;

  scheduler.schedule('sync', () => {
    assert.equal(callCount++, 0, 'sequence is correct');
  });

  scheduler.schedule('layout', () => {
    assert.equal(callCount++, 1, 'sequence is correct');
  });

  scheduler.schedule('measure', () => {
    assert.equal(callCount++, 2, 'sequence is correct');
  });

  scheduler.schedule('affect', () => {
    assert.equal(callCount++, 3, 'sequence is correct');
  });

  scheduler.schedule('affect', () => {
    assert.equal(callCount++, 4, 'sequence is correct');
  });

  await settled();
});

test('it schedules another flush if jobs have been pushed during a flush', async function (assert) {
  assert.expect(3);

  let callCount = 0;

  scheduler.schedule('measure', () => {
    assert.ok('scheduled function runs correctly');
    callCount++;

    scheduler.schedule('measure', () => {
      assert.ok('scheduled function runs correctly');
      callCount++;
    });
  });

  // Verify that the second RAF is actually scheduled
  requestAnimationFrame(() => {
    assert.equal(callCount, 1, 'call count is correct after first RAF');
  });

  await settled();
});

test('throws if it attempts to schedule to a queue that does not exist', function (assert) {
  assert.throws(() => {
    scheduler.schedule('foo', () => {});
  }, /Attempted to schedule to unknown queue: foo/);
});

test('jobs can be canceled', async function (assert) {
  assert.expect(0);

  const job = scheduler.schedule('measure', () => {
    assert.ok(false);
  });

  job.cancel();

  await settled();
});

test('jobs can be canceled from tokens', async function (assert) {
  assert.expect(0);

  const token = new Token();

  scheduler.schedule(
    'measure',
    () => {
      assert.ok(false);
    },
    token
  );

  token.cancel();

  await settled();
});

test('jobs can be canceled from parent tokens', async function (assert) {
  assert.expect(0);

  const parentToken = new Token();
  const childToken = new Token(parentToken);

  scheduler.schedule(
    'measure',
    () => {
      assert.ok(false);
    },
    childToken
  );

  parentToken.cancel();

  await settled();
});

test('jobs can be forgotten by the scheduler', async function (assert) {
  assert.expect(0);

  const token = new Token();

  scheduler.schedule(
    'measure',
    () => {
      assert.ok(false);
    },
    token
  );

  scheduler.forget(token);

  await settled();
});

test('test waiter works', async function (assert) {
  assert.expect(1);

  let callCount = 0;

  function reschedule() {
    if (callCount < 100) {
      callCount++;

      scheduler.schedule('measure', reschedule);
    } else {
      assert.ok(true);
    }
  }

  scheduler.schedule('measure', reschedule);

  await settled();
});
