const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'tests-jasmine/lib/**',
      'playwright-report/**',
      'test-results/**'
    ]
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        jasmine: 'readonly'
      }
    },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always', { null: 'ignore' }]
    }
  },
  {
    files: ['tests-jasmine/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jasmine
      }
    },
    rules: {
      'no-console': 'off'
    }
  },
  {
    files: ['tests/**/*.js', 'playwright/**/*.js'],
    rules: {
      'no-console': 'off'
    }
  }
];
