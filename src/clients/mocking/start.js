import bluebirdSetup from 'common/bluebirdSetup';
import {eachService} from './setup';
import {log} from 'backend/logger';
import {server, startServer} from './server';
import urlOfServer from 'common/urlOfServer';

export const promise = startServer()
  .then(() => {
    const serverUrl = urlOfServer(server);
    log.info(`Started mocking server on ${serverUrl}`);
  })
  .catch(err => {
    if (server) {
      server.unref();
    }
    log.error(`Error occurred during startup: ${err.stack}`);
  });
