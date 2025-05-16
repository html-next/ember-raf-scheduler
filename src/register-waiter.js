import { registerWaiter as ourRegisterWaiter } from './index.js';

/**
 * @deprecated import { registerWaiter } from 'ember-raf-scheduler/test-support' instead
 */
export default function regitserWaiter() {
 ourRegisterWaiter();
}
