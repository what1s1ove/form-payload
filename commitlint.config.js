import { RuleConfigSeverity } from '@commitlint/types';

const PROJECT_PREFIXES = /** @type {const} */ (['fp', 'release']);

/** @type {import('@commitlint/types').UserConfig} */
const configuration = {
	extends: ['@commitlint/config-conventional'],
	parserPreset: {
		parserOpts: {
			issuePrefixes: PROJECT_PREFIXES.map((prefix) => `${prefix}-`),
		},
	},
	rules: {
		'header-case': [RuleConfigSeverity.Error, 'always', 'lower-case'],
		'header-trim': [RuleConfigSeverity.Error, 'always'],
		'references-empty': [RuleConfigSeverity.Error, 'never'],
	},
};

export { PROJECT_PREFIXES };
export default configuration;
