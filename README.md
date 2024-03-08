## nestjs graphQL endpoints with jwt and graphQL auth

A minimal nestjs backend service built for a starter template.
Currently not using any DB but in memory user list for op's.
Exposes graphQL and rest endpoints for crud ops on User resource.

### Functionality

Allows create/update/get users from service.\
Jwt authentication is implemented to

- validate
  validates user while accepting email and password

- login
  Allows login and returns jwt token

- verify
  verifies jwt token and return authenticated user or else error.

#### graphQL ops

- createUser
- updateUser
- deleteUser
- getUsers

Following is behind graphQL auth guard while rest are not for the sake of demo.

- getUser

#### Rest ops

- /:userid
  to get single user

- /
  POST: for create user
  GET: get all users

- /:userId
  PATCH: patch an existing resource

### scripts

install nest cli `npm i -g @nestjs/cli`

create new nest project `nest new <project-name>`

create module `nest g module <moduleName>`

create a service `nest g service <serviceName>`

create app `orders` within monorepo `npm generate app orders`

or with short command name `npm g app orders`

To start default app `npm run start:dev`

To start a specific app `npm run start:dev <appname>`

### deps & usage

`class-validator` for IsNotEmpty, IsArray validations over class fields.
