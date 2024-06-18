import {error} from "./logger.js"

const requestLogger = (req, res, next) => {
  error("Method:", req.method);
  error("Path:  ", req.path);
  error("Body:  ", req.body);
  error("---");
  next();
};

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (err, request, response, next) => {
  error(err.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return response.status(400).json({ error: err.message })
  }

  next(err)
}

export { requestLogger, unknownEndpoint, errorHandler };
