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
  next()
};

const errorHandler = (error, request, response, next) => {
  if (
    error.name === "CastError" ||
    error.message.includes(
      'Cast to ObjectId failed for value "id" (type string) at path "_id" for model "User"'
    ) ||
    error.message.includes(
      'Cast to ObjectId failed for value "id" (type string) at path "_id" for model "Todo"'
    )
  ) {
    return response.status(400).send({ error: "wrong format of id" });
  } else if (error.name === "User validation failed" && error.message.includes("name: Path `name` is required")) {
    return response.status(400).json({ error: error.message });
  } else if (
    error.name === "MongoServerError" ||
    error.message.includes("E11000 duplicate key error collection")
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
