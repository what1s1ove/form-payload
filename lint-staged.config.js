/** @type {import('lint-staged').Config} */
const config = {
	'*': ['npm run ci:lint:fs', 'npm run ci:lint:editor'],
	'*.{json,md,yml,js}': 'prettier --write',
	'*.js': ['npm run ci:lint:js', "bash -c 'npm run ci:lint:type'"],
};

export default config;
