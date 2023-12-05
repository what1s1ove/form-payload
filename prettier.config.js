/** @type {import('prettier').Config} */
let config = {
	printWidth: 80,
	semi: true,
	singleQuote: true,
	quoteProps: 'as-needed',
	trailingComma: 'all',
	bracketSpacing: true,
	arrowParens: 'always',
	plugins: ['prettier-plugin-jsdoc'],
};

export default config;
