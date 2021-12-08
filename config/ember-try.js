/* eslint-env node */
'use strict';

const getChannelURL = require('ember-source-channel-url');
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    useYarn: true,
    scenarios: [
      {
        name: 'ember-lts-2.8',
        bower: {
          dependencies: {
            ember: 'components/ember#lts-2-8',
          },
          resolutions: {
            ember: 'lts-2-8',
          },
        },
        npm: {
          devDependencies: {
            '@ember/test-helpers': null,
            'ember-auto-import': null,
            'ember-cli-dependency-checker': '^2.0.0',
            'ember-cli-htmlbars': '3.0.1',
            'ember-cli-shims': '^1.2.0',
            'ember-qunit': '^4.5.1',
            'ember-resolver': '^5.1.1',
            'ember-source': null,
            'ember-source-channel-url': '^2.0.1',
            qunit: null,
          },
        },
      },
      {
        name: 'ember-lts-2.12',
        npm: {
          devDependencies: {
            '@ember/test-helpers': null,
            'ember-cli-dependency-checker': '^2.0.0',
            'ember-cli-htmlbars': '3.0.1',
            'ember-cli-shims': '^1.2.0',
            'ember-qunit': '^4.5.1',
            'ember-resolver': '^5.1.1',
            'ember-source': '~2.12.0',
            'ember-source-channel-url': '^2.0.1',
            qunit: null,
          },
        },
      },
      {
        name: 'ember-lts-2.18',
        npm: {
          devDependencies: {
            '@ember/test-helpers': null,
            'ember-cli-dependency-checker': '^2.0.0',
            'ember-cli-htmlbars': '3.0.1',
            'ember-cli-shims': '^1.2.0',
            'ember-qunit': '^4.5.1',
            'ember-resolver': '^5.1.1',
            'ember-source': '~2.18.0',
            'ember-source-channel-url': '^2.0.1',
            qunit: null,
          },
        },
      },
      {
        name: 'ember-lts-3.4',
        npm: {
          devDependencies: {
            'ember-source': '~3.4.0',
          },
        },
      },
      {
        name: 'ember-lts-3.8',
        npm: {
          devDependencies: {
            'ember-source': '~3.8.0',
          },
        },
      },
      {
        name: 'ember-lts-3.12',
        npm: {
          devDependencies: {
            'ember-source': '~3.12.0',
          },
        },
      },
      {
        name: 'ember-lts-3.16',
        npm: {
          devDependencies: {
            'ember-source': '~3.16.0',
          },
        },
      },
      {
        name: 'ember-lts-3.20',
        npm: {
          devDependencies: {
            'ember-source': '~3.20.5',
          },
        },
      },
      {
        name: 'ember-lts-3.24',
        npm: {
          devDependencies: {
            'ember-source': '~3.24.3',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release'),
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta'),
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('canary'),
          },
        },
      },
      // The default `.travis.yml` runs this scenario via `yarn test`,
      // not via `ember try`. It's still included here so that running
      // `ember try:each` manually or from a customized CI config will run it
      // along with all the other scenarios.
      {
        name: 'ember-default',
        npm: {
          devDependencies: {},
        },
      },
      {
        name: 'ember-default-with-jquery',
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({
            'jquery-integration': true,
          }),
        },
        npm: {
          devDependencies: {
            '@ember/jquery': '^1.1.0',
          },
        },
      },
      {
        name: 'ember-classic',
        env: {
          EMBER_OPTIONAL_FEATURES: JSON.stringify({
            'application-template-wrapper': true,
            'default-async-observers': false,
            'template-only-glimmer-components': false,
          }),
        },
        npm: {
          devDependencies: {
            'ember-source': '~3.28.0',
          },
          ember: {
            edition: 'classic',
          },
        },
      },
      embroiderSafe(),
      embroiderOptimized(),
    ],
  };
};
