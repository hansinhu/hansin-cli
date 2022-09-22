import log4js from "log4js";

const { getLogger } = log4js;
const logger = getLogger("hansin-cli");

logger.level = "info";

export default logger;
