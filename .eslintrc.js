module.exports = {
    env: { es2021: true, node: true },
    plugins: [
        'prettier',
        'import'
    ],
    extends: [
        'eslint:recommended',
        'prettier',
    ],
    parserOptions: {
        'ecmaVersion': 'latest'
    },
    settings: {
        'import/resolver': {
            typescript: true,
            node: true,
        },
    },
    rules: {
        indent: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'import/order': ['error', {
            groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'type']
        }],
    },
    ignorePatterns: ['bin', 'node_modules'],
    overrides: [
        {
            files: ['*.ts'],
            plugins: [
                '@typescript-eslint'
            ],
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/stylistic',
            ],
            parserOptions: {
                project: true,
                tsconfigRootDir: __dirname,
            },
            rules: {
                'no-throw-literal': 'off',
                'semi': 'off',
                'space-before-blocks': 'off',
                'consistent-return': 'off',
                '@typescript-eslint/only-throw-error': 'error',
                '@typescript-eslint/no-unused-vars': 'error',
                '@typescript-eslint/return-await': 'error',
                '@typescript-eslint/no-explicit-any': 'error',
                '@typescript-eslint/no-magic-numbers': 'error',
                '@typescript-eslint/prefer-readonly': 'error',
                '@typescript-eslint/semi': 'error',
                '@typescript-eslint/sort-type-constituents': 'error',
                '@typescript-eslint/space-before-blocks': 'error',
                '@typescript-eslint/unbound-method': 'error',
                '@typescript-eslint/use-unknown-in-catch-callback-variable': 'error',
                '@typescript-eslint/array-type': 'error',
                '@typescript-eslint/ban-ts-comment': 'error',
                '@typescript-eslint/ban-types': 'error',
                '@typescript-eslint/consistent-return': 'error',
                '@typescript-eslint/consistent-type-exports': 'error',
                '@typescript-eslint/consistent-type-imports': 'error',
                '@typescript-eslint/explicit-function-return-type': 'error',
                '@typescript-eslint/explicit-module-boundary-types': 'error',
            },
        },
    ],
};
