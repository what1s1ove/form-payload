/** @typedef {import('prettier').Config} Config */

/** @type {Config} */
const config = {
	arrowParens: 'always',
	bracketSpacing: true,
	plugins: ['prettier-plugin-jsdoc'],
	printWidth: 80,
	quoteProps: 'as-needed',
	semi: true,
	singleQuote: true,
	trailingComma: 'all',
};

export default config;
