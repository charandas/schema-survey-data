# Not an executable: please DO NOT publish to registry
# Dockerfile provided only for development and CI

FROM charandas/node:6.9.3
MAINTAINER charandas108@gmail.com

# Install dependencies
COPY .npmrc /src/
COPY package.json /src/
RUN cd /src                         && \
	echo "# REPLACE ME" > README.md && \
	npm install && \
	npm cache clean

# Bundle app source
COPY . /src

CMD ["/usr/bin/npm", "test"]
