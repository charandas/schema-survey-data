import assert from 'assert';
import uuid from 'uuid';
import { before, after } from '@charandas/test-mocha';

import getModels from '../lib/models';
import testSurvey from './fixtures/survey';

import thinky, { setupThinky, tearDownThinky } from './thinky';

const models = getModels(thinky);

describe('schema unit test', () => {
	before(setupThinky);
	after(tearDownThinky);

	// survey
	it('should be able to create a survey', () => {
		const expected = Object.assign({}, testSurvey);
		const newSurvey = new models.Survey(expected);

		return newSurvey
			.save()
			.then((result) => {
				assert.deepEqual(result, expected);
			})
			.finally(() => newSurvey.delete());
	});

	// questions
	it('should be able to create a question', () => {
		const parentSurvey = Object.assign({}, testSurvey);
		const expected = {
			id: uuid.v4(),
			name: 'test question',
			desc: 'a question to ask our user',
			kind: 'textInput',
			order: 1,
			surveyId: parentSurvey.id
		};
		const newSurvey = new models.Survey(parentSurvey);
		const newQuestion = new models.Question(expected);

		return newSurvey
			.save()
			.then((result) => {
				assert.deepEqual(result, parentSurvey);
			})
			.then(() => newQuestion.save())
			.then(result => assert.deepEqual(result, expected))
			.then(() => models.Survey.get(testSurvey.id).getJoin({	questions: true }))
			.then((result) => {
				const joinedDocs = { questions: [expected] };
				assert.deepEqual(result, Object.assign(parentSurvey, joinedDocs));
			})
			.finally(() => newSurvey.deleteAll());
	});

	// responses
	it('should be able to create an empty response to an empty survey (no questions)', () => {
		const parentSurvey = Object.assign({}, testSurvey);
		const expected = {
			id: uuid.v4(),
			user: {
				firstName: 'John',
				lastName: 'Doe',
				email: 'john.doe@example.com'
			},
			comments: 'test additional comments',
			submittedAt: '2016-12-14T22:52:50.885Z',
			surveyId: parentSurvey.id
		};

		const newSurvey = new models.Survey(parentSurvey);
		const newResponse = new models.Response(expected);
		return newSurvey
			.save()
			.then(result => assert.deepEqual(result, parentSurvey))
			.then(() => newResponse.save())
			.then((result) => {
				assert.deepEqual(result, expected);
			})
			.then(() => models.Survey.get(testSurvey.id).getJoin({ responses: true }))
			.then((result) => {
				const joinedDocs = { responses: [expected] };
				assert.deepEqual(result, Object.assign(parentSurvey, joinedDocs));
			})
			.finally(() => newSurvey.deleteAll());
	});
});
