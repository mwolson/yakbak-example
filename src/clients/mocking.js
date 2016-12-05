import Promise from 'bluebird';
import _ from 'lodash';
import {ensureValidScenario} from './mocking/setup';
import getConfig from './config';
import {server, startServer} from './mocking/server';
import {setMockRoutes} from './mocking/routes';

const config = getConfig();

function ensureStarted() {
  return server
    ? Promise.resolve()
    : startServer().then(() => server.unref());
}

export function startMocking(scenario) {
  return ensureValidScenario(scenario)
    .then(() => ensureStarted())
    .then(() => setMockRoutes(scenario));
}

export function stopMocking() {
  config.setEffectiveUrls();
}
