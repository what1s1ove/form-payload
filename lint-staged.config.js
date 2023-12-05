/** @type {import('lint-staged').Config} */
let config = {
	'*': ['npm run lint:fs', 'npm run lint:editor'],
	'*.{json,md,yml,js}': 'prettier --write',
	'*.js': ['npm run lint:js', "bash -c 'npm run lint:type'"],
};

export default config;
