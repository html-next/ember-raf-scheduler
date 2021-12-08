/* eslint-disable ember/no-legacy-test-waiters */
import { registerWaiter as emberRegisterWaiter } from '@ember/test';
import scheduler from 'ember-raf-scheduler';

export default function registerWaiter() {
  emberRegisterWaiter(function () {
    return scheduler.jobs === 0;
  });
}
