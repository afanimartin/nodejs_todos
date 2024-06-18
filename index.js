import app from "./src/app.js";
import { config } from "./src/utils/config.js";
import { info } from "./src/utils/logger.js";

app.listen(config.PORT, () => {
  info(`Server running on port ${config.PORT}`);
});
