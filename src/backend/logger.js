import winston from 'winston';

const origLogger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      handleExceptions: false,
      timestamp: true,
      level: 'info'
    })
  ]
});

export let log = origLogger;

export function replaceLogger(newLogger) {
  log = newLogger;
};

export function resetLogger() {
  log = origLogger;
};
