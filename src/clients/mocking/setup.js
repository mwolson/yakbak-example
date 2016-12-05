import Promise from 'bluebird';
import _ from 'lodash';

export const clients = {
  'commerce-api': ['checkout', 'shopping']
};

export const scenarios = ['early-mocks', 'invalid-ids'];

export function eachService(func) {
  _.each(clients, (services, service) => {
    _.each(services, subService => func(service, subService));
  });
}

export function eachScenarioRoute(func) {
  _.each(scenarios, scenario => {
    _.each(clients, (services, service) => {
      _.each(services, subService => func(scenario, service, subService));
    });
  });
}

export function ensureValidScenario(scenario) {
  return _.contains(scenarios, scenario)
    ? Promise.resolve()
    : Promise.reject(new Error(`Scenario '${scenario}' not supported yet; add it to clients/mocking/setup.js`));
}
