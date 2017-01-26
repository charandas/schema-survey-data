const questionTypes = Object.freeze([
	{ kind: 'selectSingle', desc: 'Select a single choice' },
	{ kind: 'selectMultiple', desc: 'Select as many as choices as applicable' },
	{ kind: 'textInput', desc: 'Input your response in your own words' }
]);

export function questionTypesEnum() {
	return Object.keys(questionTypes).map(f => questionTypes[f].kind);
}

export default questionTypes;
