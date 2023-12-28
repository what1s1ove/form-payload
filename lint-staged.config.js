/** @type {import('lint-staged').Config} */
const config = {
	'*': [
		'npm run ci:lint:fs',
		'npm run ci:lint:editor',
		"bash -c 'npm run ci:lint:trash'",
	],
	'*.{json,md,yml,js}': ['npm run ci:lint:format'],
	'*.js': ['npm run ci:lint:js', "bash -c 'npm run ci:lint:type'"],
};

export default config;
