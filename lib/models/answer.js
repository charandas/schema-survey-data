import { type } from 'thinky';

export default function (thinky) {
	return thinky.createModel('Answer', {
		id: type.string().uuid(4),
		value: type.string(),
		questionId: type.string(),
		responseId: type.string()
	});
}
