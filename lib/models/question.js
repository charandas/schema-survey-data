import { type } from 'thinky';
import { questionTypesEnum } from '../question-types';

export default function (thinky) {
	return thinky.createModel('Question', {
		id: type.string().uuid(4),
		name: type.string(),
		desc: type.string(),
		kind: type.string().enum(questionTypesEnum()),
		order: type.number(),
		surveyId: type.string()
	});
}
