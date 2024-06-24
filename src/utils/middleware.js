import { error } from "./logger.js";

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

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "wrong format of id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return response
      .status(400)
      .json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid access token" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "access token expired",
    });
  }

  next(error);
};

export { requestLogger, unknownEndpoint, errorHandler };
