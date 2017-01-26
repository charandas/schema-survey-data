/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import babel from 'gulp-babel';
import istanbul from 'gulp-babel-istanbul';
import lintspaces from 'gulp-lintspaces';
import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';

import lintspacesrc from '@charandas/lintrc/lintspaces.json';
import spacesindentrc from '@charandas/lintrc/spaceindent';
import getSrcDirs from '@charandas/gulp-src-entries';

const IGNORE_ITEMS = ['node_modules', 'coverage', 'build'];

const topLevelDirs = getSrcDirs(IGNORE_ITEMS, __dirname);

const config = {
	coverage: {
		each: 80
	},
	paths: {
		eslint: [
			'*.js',
			`${topLevelDirs}/**/*.js`
		],
		build: [
			'lib/**/*.js',
			'!**/*.test.js'
		],
		js: [
			'*.js',
			`${topLevelDirs}/**/*.js`,
			'!**/*.test.js'
		],
		test: [
			`${topLevelDirs}/**/*.test.js`
		],
		whitespace: [
			'*.*',
			`${topLevelDirs}/**/*.*`,
			'!README.md',
			'!dev.yml',
			'!ci.yml'
		],
		packagejson: [
			'package.json'
		]
	}
};

gulp.task('lint:whitespace', () => {
	const notPackages = config.paths.packagejson.map(file => `!${file}`);

	return gulp.src(config.paths.whitespace.concat(notPackages))
		.pipe(lintspaces(lintspacesrc))
		.pipe(lintspaces.reporter());
});

gulp.task('lint:package', () => {
	gulp.src(config.paths.packagejson)
		.pipe(lintspaces(spacesindentrc))
		.pipe(lintspaces.reporter());
});

gulp.task('lint:js', () => {
	gulp.src(config.paths.eslint)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('mocha:cover', () => {
	gulp.src(config.paths.js)
		.pipe(istanbul())
		.pipe(istanbul.hookRequire());
});

gulp.task('mocha', ['mocha:cover'], () => {
	gulp.src(config.paths.test)
		.pipe(babel())
		.pipe(mocha({ timeout: 10000 }))
		.pipe(istanbul.writeReports())
		.pipe(istanbul.enforceThresholds({
			thresholds: config.coverage
		}));
});

gulp.task('build', () => {
	gulp.src(config.paths.build)
		.pipe(babel())
		.pipe(gulp.dest('build'));
});

gulp.task('lint', ['lint:whitespace', 'lint:package', 'lint:js']);
gulp.task('test', ['lint', 'mocha']);
gulp.task('default', ['test']);
