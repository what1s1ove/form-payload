// @ts-expect-error: no declaration file
import js from '@eslint/js';
// @ts-expect-error: no declaration file
import importPlugin from 'eslint-plugin-import';
// @ts-expect-error: no declaration file
import jsdoc from 'eslint-plugin-jsdoc';
// @ts-expect-error: no declaration file
import perfectionist from 'eslint-plugin-perfectionist';
// @ts-expect-error: no declaration file
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sonarjs from 'eslint-plugin-sonarjs';
// @ts-expect-error: no declaration file
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';

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
const unicornConfig = {
	plugins: {
		unicorn,
	},
	rules: {
		...unicorn.configs.recommended.rules,
		'unicorn/no-null': ['off'],
	},
};

/** @type {import('eslint').Linter.FlatConfig} */
const perfectionistConfig = {
	plugins: {
		perfectionist,
	},
	rules: perfectionist.configs['recommended-natural'].rules,
};

/** @type {import('eslint').Linter.FlatConfig} */
const simpleImportSortConfig = {
	plugins: {
		'simple-import-sort': simpleImportSort,
	},
	rules: {
		'simple-import-sort/exports': ['error'],
		'simple-import-sort/imports': ['error'],
	},
};

/** @type {import('eslint').Linter.FlatConfig} */
const mainRulesConfig = {
	rules: {
		'arrow-parens': ['error', 'always'],
		curly: ['error', 'all'],
		'no-multiple-empty-lines': [
			'error',
			{
				max: 1,
			},
		],
		'no-restricted-syntax': [
			'error',
			{
				message: 'Switch cases without blocks are forbidden.',
				selector: 'SwitchCase > *.consequent[type!="BlockStatement"]',
			},
			{
				message: 'Export/Import all (*) is forbidden.',
				selector: 'ExportAllDeclaration,ImportAllDeclaration',
			},
			{
				message: 'Exports should be at the end of the file.',
				selector: 'ExportNamedDeclaration[declaration!=null]',
			},
		],
		'prefer-const': ['error'],
		quotes: ['error', 'single'],
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
	{
		files: ['tests/**/*.test.js'],
		rules: {
			'perfectionist/sort-imports': ['off'],
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
	unicornConfig,
	perfectionistConfig,
	simpleImportSortConfig,
	...overridesConfigs,
];

export default config;
