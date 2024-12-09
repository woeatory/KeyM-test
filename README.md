## Project setup

```bash
$ pnpm install
```

## Setup environment varialbes

.env file

```text
PORT=8000
MONGODB_CONNECTION_STRING="mongodb+srv://<user>:<password>@cluster0.p2lvg.mongodb.net/database"
```

You can also switch to in-memory storage instead of mongoDB

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# test coverage
$ pnpm run test:cov
```

## Notes

Date

The date used in project has some pitfalls:

It does not check days to specific month and months to year. Different months can have different number of days(december - 31, february - 28) as there are leap years.
