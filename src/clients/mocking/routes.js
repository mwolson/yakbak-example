import {eachService} from './setup';
import getConfig from 'clients/config';
import {server} from './server';
import urlOfServer from 'common/urlOfServer';

const config = getConfig();

export function setMockRoutes(scenario) {
  eachService((service, subService) => {
    const serverUrl = urlOfServer(server);
    const mockUrl = `${serverUrl}/${scenario}/${service}/${subService}`;
    config.set(`${service}.${subService}.effectiveUrl`, mockUrl);
  });
}
