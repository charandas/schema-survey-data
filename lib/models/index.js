import createQuestion from './question';
import createSurvey from './survey';
import createResponse from './response';
import createAnswer from './answer';

export default function (thinky) {
	const Survey = createSurvey(thinky);
	const Question = createQuestion(thinky);
	const Response = createResponse(thinky);
	const Answer = createAnswer(thinky);

	Survey.hasMany(Response, 'responses', 'id', 'surveyId');
	Survey.hasMany(Question, 'questions', 'id', 'surveyId');

	Question.belongsTo(Survey, 'survey', 'surveyId', 'id');
	Response.belongsTo(Survey, 'survey', 'surveyId', 'id');

	Question.hasMany(Answer, 'answers', 'id', 'questionId');
	Answer.belongsTo(Question, 'question', 'questionId', 'id');

	return Object.freeze({
		Answer,
		Question,
		Response,
		Survey
	});
}
