import _thinky from 'thinky';
import Bluebird from 'bluebird';

import config from './config';

const options = config.get('rethink');
const thinky = _thinky(options);

export default thinky;

function tablesDrop() {
	return Bluebird
		.map(['Survey', 'Response', 'Question', 'Answer'], tableName => (
			thinky.r.db(options.db).table(tableName)
			.delete()
			.catch(() => undefined) // supress errors, its okay if the tables don't exist
		));
}

export function setupThinky() {
	// do something to establish a first connection
	return tablesDrop()
		.then(() => thinky.r.expr(2).add(2).run());
}

export function tearDownThinky() {
	return thinky.r.getPool().drain();
}
