const winston = require('winston')

const logger = winston.createLogger({
  level: process.env.NODE_ENV !== 'production' ? 'info' : 'warn',
  format: winston.format.simple(),
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({
      filename: `logs/${process.env.NODE_ENV === 'test' ? 'error-test' : 'error'}.log`,
      level: 'error',
    }),
    new winston.transports.File({
      filename: `logs/${process.env.NODE_ENV === 'test' ? 'combined-test' : 'combined'}.log`,
    }),
  ],
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  )
}

module.exports = logger
