import { RuleConfigSeverity } from '@commitlint/types';

/** @typedef {import('@commitlint/types').UserConfig} UserConfig */

const PROJECT_PREFIXES = /** @type {const} */ (['fp', 'release']);

/** @type {UserConfig} */
const configuration = {
	extends: ['@commitlint/config-conventional'],
	parserPreset: {
		parserOpts: {
			issuePrefixes: PROJECT_PREFIXES.map((prefix) => `${prefix}-`),
		},
	},
	rules: {
		'references-empty': [RuleConfigSeverity.Error, 'never'],
	},
};

export default configuration;
