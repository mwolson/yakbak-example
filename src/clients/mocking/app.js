import PromiseRouter from 'common/promiseRouter';
import {eachScenarioRoute} from './setup';
import express from 'express';
import getConfig from 'clients/config';
import path from 'path';
import yakbak from 'yakbak';

const config = getConfig();

function normalizeHeaders(req, res, next) {
  // Since we can start the server on any port, normalize the Host header to one fixed value, to make yakbak able to
  // replay tapes regardless of Host. See https://github.com/flickr/incoming-message-hash/issues/2 for further details.
  req.headers.host = 'localhost:8081';
  next();
}

function getMockService(scenario, service, subService) {
  const fixtureDir = path.resolve(`src/test/resources/mocks/${scenario}/${service}/${subService}`);
  const realUrl = config.get(`${service}.${subService}.baseUrl`);
  return yakbak(realUrl, {dirname: fixtureDir});
}

function handleService(app) {
  return (scenario, service, subService) => {
    const mockService = getMockService(scenario, service, subService);
    const routePath = `/${scenario}/${service}/${subService}`;
    const router = new PromiseRouter();

    router.all('/*', normalizeHeaders, mockService);
    app.use(routePath, router);
  };
}

export const app = express();
eachScenarioRoute(handleService(app));
