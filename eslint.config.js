import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { resolve as tsResolver } from 'eslint-import-resolver-typescript';
import importPlugin from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import perfectionist from 'eslint-plugin-perfectionist';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';

/** @typedef {import('eslint').Linter.FlatConfig} FlatConfig */
/** @typedef {import('eslint').Linter.ParserModule} ParserModule */

/** @type {FlatConfig} */
const ignoresConfig = {
	ignores: ['dist'],
};

/** @type {FlatConfig} */
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

/** @type {FlatConfig} */
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
		'import/parsers': {
			espree: ['.js', '.cjs'],
		},
		'import/resolver': {
			typescript: tsResolver,
		},
	},
};

/** @type {FlatConfig} */
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

/** @type {FlatConfig} */
const sonarConfig = {
	plugins: {
		sonarjs,
	},
	rules: sonarjs.configs.recommended.rules,
};

/** @type {FlatConfig} */
const unicornConfig = {
	plugins: {
		unicorn,
	},
	rules: {
		...unicorn.configs.recommended.rules,
		'unicorn/no-null': ['off'],
	},
};

/** @type {FlatConfig} */
const perfectionistConfig = {
	plugins: {
		perfectionist,
	},
	rules: perfectionist.configs['recommended-natural'].rules,
};

/** @type {FlatConfig} */
const simpleImportSortConfig = {
	plugins: {
		'simple-import-sort': simpleImportSort,
	},
	rules: {
		'simple-import-sort/exports': ['error'],
		'simple-import-sort/imports': ['error'],
	},
};

/** @type {FlatConfig} */
const typescriptPlugin = {
	languageOptions: {
		parser: /** @type {ParserModule} */ (tsParser),
		parserOptions: {
			project: './tsconfig.json',
		},
	},
	plugins: {
		'@typescript-eslint': ts,
	},
	rules: {
		...ts.configs['strict-type-checked'].rules,
	},
};

/** @type {FlatConfig} */
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

/** @type {FlatConfig[]} */
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
			'@typescript-eslint/no-floating-promises': ['off'],
			'perfectionist/sort-imports': ['off'],
			'sonarjs/cognitive-complexity': ['off'],
		},
	},
	{
		files: ['src/libs/enums/control-element-type.enum.js'],
		rules: {
			'perfectionist/sort-objects': ['off'],
		},
	},
];

/** @type {FlatConfig[]} */
const config = [
	ignoresConfig,
	globalConfig,
	importConfig,
	jsdocConfig,
	typescriptPlugin,
	sonarConfig,
	unicornConfig,
	perfectionistConfig,
	simpleImportSortConfig,
	mainRulesConfig,
	...overridesConfigs,
];

export default config;
