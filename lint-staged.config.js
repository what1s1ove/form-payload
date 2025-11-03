/** @type {import('lint-staged').Configuration} */
const config = {
	'*': [
		'npm run ci:lint:fs',
		'npm run ci:lint:editor',
		"bash -c 'npm run ci:lint:trash'",
	],
	'*.js': ['npm run ci:lint:js', "bash -c 'npm run ci:lint:type'"],
	'*.{json,md,yml,js}': ['npm run ci:lint:format'],
};

export default config;
