import Promise from 'bluebird';
import {app} from './app';
import enableDestroy from 'server-destroy';
import http from 'http';

export let server;

export function startServer() {
  return Promise.fromCallback(callback => {
    server = http.createServer(app);
    enableDestroy(server);
    server.listen(0, callback);
  });
}

export function setServer(newServer) {
  server = newServer;
}

export function stopServer() {
  return Promise.fromCallback(callback => server.destroy(callback))
    .then(() => setServer(null));
}
