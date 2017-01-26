import { type } from 'thinky';

export default function (thinky) {
	return thinky.createModel('Survey', {
		id: type.string().uuid(4),
		name: type.string(),
		desc: type.string(),
		published: type.boolean(),
		closed: type.boolean(),
		retracted: type.boolean(),
		publishedAt: type.date(),
		closedAt: type.date(),
		retractedAt: type.date()
		// questions: array setup using relations in ./index.js
		// responses: array setup using relations in ./index.js
	});
}
