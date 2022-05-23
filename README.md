# Viva Translate API
Viva translate API is the main backend service layer for viva translate challenge. The API is built using Typescript, Express, and Mongoose.

- [Typescript](https://www.typescriptlang.org/docs/home.html) - A strongly typed, object oriented, compiled language.
- [Express](https://expressjs.com) - Express.js is a free and open-source web application framework for Node.js.
- [Mongoose](https://mongoosejs.com/) - Mongoose provides a straight-forward, schema-based solution to model your application data.
- [Class Validator](https://github.com/typestack/class-validator) - Allows use of decorator and non-decorator based validation.

## Development
To start development, Please do the following. Note: this service depends on mongodb. So make sure you have installed in your computer.
### Configuration
Add a .env file to the project in the base directory adding the following or use the defaults value.
``` touch .env ```
#### .env
```
//Application variables
VIVA_APPLICATION_NODE_ENV=development
VIVA_APPLICATION_WEB_CONCURRENCY=1
VIVA_APPLICATION_PORT=5000

//Database variables
VIVA_DATABASE_MONGO_HOST=localhost
VIVA_DATABASE_MONGO_DRIVER=mongodb
VIVA_DATABASE_MONGO_PORT=27017
VIVA_DATABASE_MONGO_DB=viva
VIVA_DATABASE_MONGO_USER=
VIVA_DATABASE_MONGO_PASSWORD=

//Authentication variables
VIVA_AUTH_SECRET=
VIVA_AUTH_TOKEN_EXPIRATION_TIME=1d
`````

#### Run the Project
Run the following commands. The API will run in watch mode at http://locahost:5000/
``` npm install ```
``` npm run dev ```

## Production Build
To create a production build, please run the following:
``` npm run build ```
The output directory is set to ``` ./dist ```
