## nestjs-setup

A minimal nestjs backend service built for a starter template.

### Functionality

Allows create/update/get users from service.\
Jwt authentication is implemented to

- validate
  validates user while accepting email and password

- login
  Allows login and returns jwt token

- verify
  verifies jwt token and return authenticated user or else error.

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
