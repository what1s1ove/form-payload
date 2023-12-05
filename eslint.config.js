import globals from 'globals';
// @ts-expect-error: no declaration file
import js from '@eslint/js';
// @ts-expect-error: no declaration file
import jsdoc from 'eslint-plugin-jsdoc';

/** @type {import('eslint').Linter.FlatConfig} */
const globalConfig = {
	languageOptions: {
		globals: globals.browser,
		parserOptions: {
			ecmaVersion: `latest`,
			sourceType: `module`,
		},
	},
	rules: {
		...js.configs.recommended.rules,
	},
};

/** @type {import('eslint').Linter.FlatConfig} */
const jsdocConfig = {
	plugins: {
		jsdoc,
	},
	rules: {
		...jsdoc.configs[`recommended-typescript-flavor-error`].rules,
		'jsdoc/require-jsdoc': [
			`error`,
			{
				contexts: [
					`ArrowFunctionExpression`,
					`FunctionDeclaration`,
					`FunctionExpression`,
				],
			},
		],
		'jsdoc/require-param-description': [`off`],
		'jsdoc/require-returns-description': [`off`],
		'jsdoc/valid-types': [`off`],
	},
	settings: {
		jsdoc: {
			mode: `typescript`,
		},
	},
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
		'arrow-parens': ['error', 'always'],
	},
};

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [globalConfig, jsdocConfig, mainRulesConfig];

export default config;
