### schema-survey-data

Oftentimes, the most heart-poured work of us software developers remains within confines
of closed-source at companies we have left behind us.

This is just a repository from my personal hacking that I have made public to
demonstrate my coding style to potential employers or clients.

It depends on certain private npm packages and docker images, and is not intended
to be run by you.

Hopefully, though the coding style and structure provides some insight into me as
a developer.

## Development

1. With docker and docker compose installed, and `docker login gitlab.com` done,
  ```
  # Start the container
  docker-compose -f ./dev.yml up -d
  ```

2. Enter the container
  ```
  # Execute a shell and enter it in the running container
  ❯ docker-compose -f ./dev.yml exec lib sh
  # then inside the container
  npm test
  ```

3. For docker cleanup, enter this on the dev box after quiting any interactive shells, or they would quit anyways:
  ```
  ❯ docker-compose -f ./dev.yml down
  ```


### TODO

Expand answer model's capabilities, and test them.
