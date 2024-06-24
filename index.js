import app from "./src/app.js";
import { info } from "./src/utils/logger.js";

import dotenv from "dotenv";
dotenv.config();

app.listen(process.env.PORT, () => {
  info(`Server running on port ${process.env.PORT}`);
});
