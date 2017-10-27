[![Build Status](https://travis-ci.org/html-next/ember-raf-scheduler.svg?branch=master)](https://travis-ci.org/html-next/ember-raf-scheduler)

# ember-raf-scheduler

Super simple RAF scheduler that integrates with the Ember runloop

## Basics

Super simple example:

```js
import { scheduler } from 'ember-raf-scheduler';

// schedule a job
const job = scheduler.schedule('measure', () => {
  console.log('Hello, world!');
});

// cancel the job
scheduler.forget(job);
```

There are 4 queues:

* `sync` - Wrapped in a runloop, use this queue for all Ember related work
* `layout` - This queue can be used for touch up on the Ember work in general
  (small DOM manipulations, for instance)
* `measure` - General measurements should occur here
* `affect` - Fixup DOM manipulation after measurements have been done

### Tokens

Tokens can be created and passed into the scheduler. All jobs that were
scheduled with a token can be cancelled by cancelling the parent token.

```js
import { scheduler, Token } from 'ember-raf-scheduler';

export default Component.extend({
  init() {
    this.token = new Token();
  },

  willDestroy() {
    scheduler.forget(this.token);
  },

  schedule(queue, job) {
    scheduler.schedule(queue, job, this.token);
  }
});
```

### Perf Notes

Measurements in RAFs are basically free if you do them before any other
DOM manipulation (same rules as standard forced layouts, etc), so you should
batch all measurements in `measure` and if possible avoid using the `sync`
and `layout` queues. There are times when it's necessary to do Ember specific
manipulations (for instance, you need to use `set` and you want the template
to render _before_ you measure) which is what the `sync` and `layout` queues
are for.

## Installation

* `git clone <repository-url>` this repository
* `cd ember-raf-scheduler`
* `yarn install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `yarn test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
