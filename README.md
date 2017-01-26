### schema-survey-data

Oftentimes, the most heart-poured work of us software developers remains within confines
of closed-source at companies we have left behind us.

This is just a repository from my personal hacking that I have made public to
demonstrate my coding style to potential employers or clients. 

It depends on certain private npm packages and docker images, and is not intended
to be run by you.

Hopefully, though the coding style and structure provides some insight into me as
a developer.

### Development

2. Setup dev env:
	```
	docker-compose -f dev.yml build lib
	docker-compose -f dev.yml run lib /bin/bash

	# Run a full test suite as defined by gulpfile
	npm test

	# Run a test selectively
	mocha --compilers js:babel-register test/models.test.js --timeout 5000
	```

3. Stopping and cleanup (in the process of automating all this):
	```
	docker-compose down
	```

4. Notes for CI automation ONLY:
	```
	docker-compose -f ci.yml build lib
	docker-compose -f ci.yml run lib
	docker-compose down
	```

### TODO

Expand answer model's capabilities, and test them.
