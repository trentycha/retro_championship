import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
    {
        ignores: ['frontend/**', 'node_modules/**'],
    },
    js.configs.recommended,
    {
        plugins: {
            prettier: prettierPlugin,
        },
        languageOptions: {
            ecmaVersion: 2021,
            globals: {
                process: 'readonly',
                require: 'readonly',
                module: 'readonly',
                exports: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                console: 'readonly',
            },
        },
        rules: {
            'no-unused-vars': 'warn',
            'no-console': 'off',
            'prettier/prettier': 'error',
        },
    },
    {
        files: ['tests/**/*.js'],
        languageOptions: {
            globals: {
                describe: 'readonly',
                it: 'readonly',
                expect: 'readonly',
                beforeEach: 'readonly',
                jest: 'readonly',
            },
        },
    },
    prettier,
];
