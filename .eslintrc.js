module.exports = {
	env: {
		browser: true,
		commonjs: true
	},
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
			legacyDecorators: true
		},
		sourceType: 'module'
	},
	plugins: ['react', 'react-native'],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-console': ['off']
	}
};
