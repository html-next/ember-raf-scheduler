import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';
import { start } from 'ember-cli-qunit';

import registerWaiter from 'ember-raf-scheduler/test-support/register-waiter';

setResolver(resolver);
registerWaiter();
start();
