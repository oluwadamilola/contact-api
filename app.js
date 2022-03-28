const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const httpStatus = require('http-status');

const handleError = require('./errors/handle-error');
const AppError = require('./errors/app-error');

const contactRouter = require('./contacts/contact-handler');

const app = express();

app.disable('x-powered-by');
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', contactRouter);

app.use((err, _req, _res, next) => {
  if (!err) {
    next(new AppError(httpStatus.NOT_FOUND, 'Not found'));

    return;
  }

  next(err);
});

app.use(async (err, _req, res, _next) => {
  await handleError(err, res);
});

process.on('uncaughtException', (error) => {
  handleError(error);

  if (!isOperational(error)) {
    process.exit(1);
  }
});

module.exports = app;
