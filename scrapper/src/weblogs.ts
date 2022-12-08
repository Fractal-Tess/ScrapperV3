import cors from 'cors';
import polka from 'polka';
import path from 'node:path';
import url from 'node:url';
import { ReplaySubject } from 'rxjs';
import { getEnv } from './config.js';
import { loggers, type LoggerIdentifier } from './logger.js';
import serve from 'serve-static';

export interface Endpoint {
  identifier: LoggerIdentifier;
  path: string;
  rpSubject: ReplaySubject<string>;
}

const app = polka();

app.use(cors());
const serveDir = path.join(
  url.fileURLToPath(new URL('.', import.meta.url)),
  '../dist'
);

app.use(serve(serveDir));

const endpoints: Endpoint[] = loggers.map(([identifier, rpSubject]) => {
  return {
    identifier,
    path: `stream-logs/${identifier.kind}/${identifier.type}/${identifier.name}`,
    rpSubject,
  };
});

app.get('/endpoints', (_, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(
    JSON.stringify(
      endpoints.map(({ identifier, path }) => ({ identifier, path }))
    )
  );
});

endpoints.map(({ rpSubject, path }) => {
  app.get(path, async (req, res) => {
    console.log('here');
    res.setHeader('Content-Type', 'text/event-stream');

    const subscription = rpSubject.subscribe((log) => {
      res.write(`data: ${log}\n\n`);
    });

    req.on('close', () => {
      subscription.unsubscribe();
    });
  });
});

export const startServer = async () => {
  await app.listen(getEnv('WEBUI_PORT'), '0.0.0.0', () => {
    console.log(`Server listening on port ${getEnv('WEBUI_PORT')}`);
  });
};
