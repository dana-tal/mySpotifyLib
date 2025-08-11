
import winston from 'winston';

const infoLogger = winston.createLogger({
level: 'info',
format: winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
),
transports:[
    new winston.transports.File({ filename: 'logs/info.log' })
]

});

export default infoLogger;
