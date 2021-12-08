import scheduler from 'ember-raf-scheduler';
import { registerWaiter } from '@ember/test';

export default function registerWaiter() {
  registerWaiter(function() {
    return scheduler.jobs === 0;
  });
}
