const winston = require("winston");
const chalk = require("chalk");

module.exports.colorizeLevel = winston.format((info, opts) => {
  const level = info.level.toUpperCase();

  switch (level) {
    case "ERROR":
      info.level = chalk.bgRedBright(chalk.blackBright(level));
      break;
    case "WARN":
      info.level = chalk.bgYellowBright(chalk.blackBright(level));
      break;
    case "INFO":
      info.level = chalk.bgBlueBright(chalk.blackBright(level));
      break;
    case "DEBUG":
      info.level = chalk.bgWhite(chalk.blackBright(level));
      break;
    case "VERBOSE":
      info.level = chalk.bgCyan(chalk.blackBright(level));
      break;
    default:
      info.level = level;
      break;
  }
  return info;
});
