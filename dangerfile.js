import lintCommitlint from '@commitlint/lint';
import loadCommitlintConfig from '@commitlint/load';
import { danger, fail, schedule } from 'danger';

import { PROJECT_PREFIXES } from './commitlint.config.js';

/** @returns {void} */
const checkPRAssignee = () => {
	const hasAssignee = Boolean(danger.github.pr.assignee);

	if (!hasAssignee) {
		fail('This pull request should have at least one assignee.');
	}
};

/** @returns {Promise<void>} */
const checkPRTitle = async () => {
	const commitLintConfig = await loadCommitlintConfig();
	const { errors, valid: isValid } = await lintCommitlint(
		danger.github.pr.title,
		commitLintConfig.rules,
		{ parserOpts: commitLintConfig.parserPreset?.parserOpts ?? {} },
	);

	if (!isValid) {
		const messageDetail = errors
			.map((error) => `${error.name}: ${error.message}`)
			.join(', ');

		fail(
			`The pull request title should match the following rules: ${messageDetail}.`,
		);
	}
};

/** @returns {void} */
const checkPRBranch = () => {
	const githubDefaultBranchRegExp = new RegExp(/^\d+(?:-[a-z]+)+$/);
	const releaseBranchRegExp = new RegExp(`^${PROJECT_PREFIXES.join('|')}.*`);
	const regExps = [githubDefaultBranchRegExp, releaseBranchRegExp];
	const isValid = regExps.some((regExp) => {
		return regExp.test(danger.github.pr.head.ref);
	});

	if (!isValid) {
		const messageDetail = regExps.join(' or ');

		fail(
			`The pull request branch should match one of the following patterns: ${messageDetail}.`,
		);
	}
};

/** @returns {Promise<void>} */
const checkPR = async () => {
	await checkPRTitle();
	checkPRBranch();
	checkPRAssignee();
};

schedule(checkPR());
