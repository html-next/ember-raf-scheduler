/* eslint-disable ember/no-legacy-test-waiters */
import { registerWaiter as emberRegisterWaiter } from '@ember/test';
import scheduler from 'ember-raf-scheduler';
import { deprecate } from '@ember/debug';

export default function registerWaiter() {
  deprecate(
    '`registerWaiter` is not longer required. This can now be safely removed.',
    false,
    {
      id: 'ember-raf-scheduler.legacy-register-waiter',
      until: '0.5.0',
      for: 'ember-raf-scheduler',
      since: {
        available: '0.4.1',
        enabled: '0.4.1',
      },
    }
  );
  emberRegisterWaiter(function () {
    return scheduler.jobs === 0;
  });
}
