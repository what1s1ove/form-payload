import { RuleConfigSeverity } from '@commitlint/types';

const PROJECT_PREFIXES = /** @type {const} */ ([`fp`, `release`]);

/** @type {import('@commitlint/types').UserConfig} */
const configuration = {
	extends: [`@commitlint/config-conventional`],
	parserPreset: {
		parserOpts: {
			issuePrefixes: PROJECT_PREFIXES.map((it) => `${it}-`),
		},
	},
	rules: {
		'references-empty': [RuleConfigSeverity.Error, `never`],
	},
};

export default configuration;
