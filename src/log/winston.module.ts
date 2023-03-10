import { WinstonModule } from 'nest-winston';
import winston from 'winston';
import WinstonDailyRotateFile from 'winston-daily-rotate-file';

export const winstonModule = WinstonModule.forRoot({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'connector' },
  levels: {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    queue: 7,
    debug: 8
  },
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new WinstonDailyRotateFile({
      dirname: 'logs/debug',
      filename: 'debug-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      json: true,
      maxSize: '50m',
      maxFiles: '14d',
      utc: true,
      level: 'debug'
    }),
    new WinstonDailyRotateFile({
      dirname: 'logs/queue',
      filename: 'queue-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      json: true,
      maxSize: '50m',
      maxFiles: '14d',
      utc: true,
      level: 'queue'
    })
  ]
});

export default winstonModule;
