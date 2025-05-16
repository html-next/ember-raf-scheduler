import { deprecate } from '@ember/debug';

/**
 * @deprecated no longer needed
 */
export default function regitserWaiter() {
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
    },
  );
}
