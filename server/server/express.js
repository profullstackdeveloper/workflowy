import createError from 'http-errors';
import express from 'express';
import path from 'path'
import cookieParser from 'cookie-parser'
import {makeExecutableSchema} from 'graphql-tools'
import resolvers from './graphql/resolvers';
import {graphqlHTTP} from 'express-graphql';
import fs from 'fs'
import dbControl from './api/dbControl'
import cors from 'cors';
import bodyParser from 'body-parser';

const typeDefs = fs.readFileSync(path.join(process.cwd(),'/server/graphql/Schema.graphql'), 'utf-8');
const schema = makeExecutableSchema({typeDefs, resolvers})

var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser())


//make context
const context = {};

// set db context

context.db = dbControl;

import userRouter from './api/route/user.route'
app.use(cors({}))
app.use('/', userRouter)

app.use("/graphql",graphqlHTTP({
  schema : schema,
  context,
  graphiql : true
}))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

export default app;