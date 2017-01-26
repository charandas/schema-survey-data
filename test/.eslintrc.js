module.exports = {
	'extends': '@charandas/eslint-config-base',
	'rules': {
		'import/no-extraneous-dependencies': [2, { devDependencies: true }]
	}
};
