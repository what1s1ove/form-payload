import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { resolve as tsResolver } from 'eslint-import-resolver-typescript';
import importPlugin from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import perfectionist from 'eslint-plugin-perfectionist';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';

/** @typedef {import('eslint').Linter.Config} */
let Config;
/** @typedef {import('eslint').ESLint.Plugin} */
let Plugin;

/** @type {Config} */
const ignoresConfig = {
	ignores: ['dist'],
};

/** @type {Config} */
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

/** @type {Config} */
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
		'import/no-cycle': ['error'],
		'import/no-default-export': ['error'],
		'import/no-duplicates': ['error'],
	},
	settings: {
		'import/resolver': {
			typescript: tsResolver,
		},
	},
};

/** @type {Config} */
const jsdocConfig = {
	plugins: {
		jsdoc,
	},
	rules: {
		...jsdoc.configs['flat/recommended-typescript-flavor-error'].rules,
		'jsdoc/no-undefined-types': ['error'],
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
		'jsdoc/require-returns': [
			'error',
			{
				forceRequireReturn: true,
			},
		],
		'jsdoc/require-returns-description': ['off'],
	},
	settings: {
		jsdoc: {
			mode: 'typescript',
		},
	},
};

/** @type {Config} */
const sonarConfig = {
	plugins: {
		sonarjs,
	},
	rules: {
		...sonarjs.configs.recommended.rules,
	},
};

/** @type {Config} */
const unicornConfig = {
	plugins: {
		unicorn,
	},
	rules: {
		...unicorn.configs.recommended.rules,
		'unicorn/no-null': ['off'],
	},
};

/** @type {Config} */
const perfectionistConfig = {
	plugins: {
		perfectionist,
	},
	rules: {
		...perfectionist.configs['recommended-natural'].rules,
	},
};

/** @type {Config} */
const typescriptPlugin = {
	languageOptions: {
		parser: tsParser,
		parserOptions: {
			project: './tsconfig.json',
		},
	},
	plugins: {
		'@typescript-eslint': /** @type {Plugin} */ (
			/** @type {unknown} */ (ts)
		),
	},
	rules: {
		...ts.configs['strict-type-checked']?.rules,
	},
};

/** @type {Config} */
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

/** @type {Config[]} */
const overridesConfigs = [
	{
		files: [
			'commitlint.config.js',
			'prettier.config.js',
			'lint-staged.config.js',
			'eslint.config.js',
			'knip.config.js',
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
			'@typescript-eslint/no-floating-promises': ['off'],
			'sonarjs/cognitive-complexity': ['off'],
			'sonarjs/no-nested-functions': ['off'],
		},
	},
	{
		files: ['src/libs/enums/control-element-type.enum.js'],
		rules: {
			'perfectionist/sort-objects': ['off'],
			'sonarjs/no-hardcoded-passwords': ['off'],
		},
	},
];

/** @type {Config[]} */
const config = [
	ignoresConfig,
	globalConfig,
	importConfig,
	jsdocConfig,
	typescriptPlugin,
	sonarConfig,
	unicornConfig,
	perfectionistConfig,
	mainRulesConfig,
	...overridesConfigs,
];

export default config;
