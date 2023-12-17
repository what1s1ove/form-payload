/** @typedef {import('lint-staged').Config} Config */

/** @type {Config} */
const config = {
	'*': ['npm run ci:lint:fs', 'npm run ci:lint:editor'],
	'*.{json,md,yml,js}': ['npm run ci:lint:format'],
	'*.js': ['npm run ci:lint:js', "bash -c 'npm run ci:lint:type'"],
};

export default config;
