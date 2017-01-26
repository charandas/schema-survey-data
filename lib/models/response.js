import { type } from 'thinky';

export default function (thinky) {
	return thinky.createModel('Response', {
		id: type.string(),
		user: type.object().schema({
			firstName: type.string(),
			lastName: type.string(),
			email: type.string().email()
		}),
		// answers: array setup using relations in ./index.js
		comments: type.string(),
		submittedAt: type.date(),
		surveyId: type.string()
	});
}
