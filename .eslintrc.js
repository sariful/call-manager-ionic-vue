module.exports = {
  root: true,
  env: {
      node: true
  },
  'extends': [
      'plugin:vue/vue3-essential',
      'eslint:recommended'
  ],
  parserOptions: {
      ecmaVersion: 2020
  },
  rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/no-deprecated-slot-attribute': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      "indent": [
          "error",
          4
      ],
      "linebreak-style": [
          "error",
          "unix"
      ],
      "quotes": [
          "error",
          "double"
      ],
      "semi": [
          "error",
          "always"
      ]
  },
  overrides: [
      {
          files: [
              '**/__tests__/*.{j,t}s?(x)',
              '**/tests/unit/**/*.spec.{j,t}s?(x)'
          ],
          env: {
              jest: true
          }
      },
      {
          files: [
              "**/*.vue",
          ],
          rules: {
              "indent": [
                  "error",
                  2
              ],
          }
      }
  ]
};
