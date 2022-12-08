import { transports, format, createLogger, Logger } from 'winston';
import { ReplaySubject } from 'rxjs';
import path from 'node:path';
import url from 'node:url';

export type LoggerIdentifier = {
  name?: 'gogoanime' | 'mangakakalot';
  type: 'anime' | 'manga' | 'html' | 'altTitles';
  kind: 'scrapper' | 'utils' | 'model' | 'cache';
};

export const loggers: [LoggerIdentifier, ReplaySubject<string>][] = [];

const cLogger = (identifier: LoggerIdentifier) => {
  const rpSubject = new ReplaySubject<string>(50);

  const dirname = path.join(
    url.fileURLToPath(new URL('.', import.meta.url)),
    `../logs/${identifier.type}/${
      identifier.name ? `${identifier.name}/` : ''
    }${identifier.kind}`
  );
  const logger = createLogger({
    format: format.combine(
      format.label({
        label: identifier.type + (identifier.name ? `|${identifier.name}` : ''),
      }),
      format.timestamp({ format: 'MM-DD hh:mm:ss.SSS A' }),
      format.printf(({ level, message, label, timestamp }) => {
        const msg = `${timestamp} [${label}] ${level}: ${message}`;
        rpSubject.next(msg);
        return msg;
      })
    ),
    transports: [
      new transports.File({
        level: 'error',
        dirname,
        filename: 'error.log',
      }),
      new transports.File({
        level: 'debug',
        dirname,
        filename: 'logs.log',
      }),
      new transports.Console({
        level: 'debug',
      }),
    ],
  });

  loggers.push([identifier, rpSubject]);
  return logger;
};

export const createTimer = () => {
  const start = process.hrtime();
  return () => {
    return `${process.hrtime(start)[1] / 1_000_000}ms`;
  };
};

export { cLogger as createLogger };
