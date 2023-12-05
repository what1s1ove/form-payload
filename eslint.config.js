import globals from 'globals';
// @ts-expect-error: no declaration file
import js from '@eslint/js';
// @ts-expect-error: no declaration file
import importPlugin from 'eslint-plugin-import';
// @ts-expect-error: no declaration file
import jsdoc from 'eslint-plugin-jsdoc';
import sonarjs from 'eslint-plugin-sonarjs';

/** @type {import('eslint').Linter.FlatConfig} */
const globalConfig = {
	languageOptions: {
		globals: globals.browser,
		parserOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
	},
	rules: {
		...js.configs.recommended.rules,
	},
};

/** @type {import('eslint').Linter.FlatConfig} */
const importConfig = {
	plugins: {
		import: importPlugin,
	},
	rules: {
		...importPlugin.configs.recommended.rules,
		'import/exports-last': ['error'],
		'import/extensions': ['error', 'ignorePackages'],
		'import/first': ['error'],
		'import/group-exports': ['error'],
		'import/newline-after-import': ['error'],
		'import/no-default-export': ['error'],
		'import/no-duplicates': ['error'],
	},
	settings: {
		'import/parsers': {
			espree: ['.js', '.cjs'],
		},
	},
};

/** @type {import('eslint').Linter.FlatConfig} */
const jsdocConfig = {
	plugins: {
		jsdoc,
	},
	rules: {
		...jsdoc.configs['recommended-typescript-flavor-error'].rules,
		'jsdoc/require-jsdoc': [
			'error',
			{
				contexts: [
					'ArrowFunctionExpression',
					'FunctionDeclaration',
					'FunctionExpression',
				],
			},
		],
		'jsdoc/require-param-description': ['off'],
		'jsdoc/require-returns-description': ['off'],
		'jsdoc/valid-types': ['off'],
	},
	settings: {
		jsdoc: {
			mode: 'typescript',
		},
	},
};

/** @type {import('eslint').Linter.FlatConfig} */
const sonarConfig = {
	plugins: {
		sonarjs,
	},
	rules: sonarjs.configs.recommended.rules,
};

/** @type {import('eslint').Linter.FlatConfig} */
const mainRulesConfig = {
	rules: {
		'no-multiple-empty-lines': [
			'error',
			{
				max: 1,
			},
		],
		curly: ['error', 'all'],
		quotes: ['error', 'single'],
		'arrow-parens': ['error', 'always'],
		'prefer-const': ['error'],
	},
};

/** @type {import('eslint').Linter.FlatConfig[]} */
const overridesConfigs = [
	{
		files: [
			'commitlint.config.js',
			'prettier.config.js',
			'lint-staged.config.js',
			'eslint.config.js',
			'jest.config.js',
		],
		rules: {
			'import/no-default-export': ['off'],
		},
	},
	{
		files: ['lint-staged.config.js'],
		rules: {
			quotes: ['off'],
		},
	},
];

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
	globalConfig,
	importConfig,
	jsdocConfig,
	mainRulesConfig,
	sonarConfig,
	...overridesConfigs,
];

export default config;
