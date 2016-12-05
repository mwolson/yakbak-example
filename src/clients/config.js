import _ from 'lodash';

const namespace = 'clients';

var store = {};

function has(key) {
  return _.has(store, `${namespace}.${key}`);
}

function get(key) {
  return _.get(store, `${namespace}.${key}`);
}

function set(key, value) {
  return _.set(store, `${namespace}.${key}`, value);
}

function getPrefixed(prefix) {
  return key => {
    const defaultKey = `defaults.${key}`;
    const specificKey = `${prefix}.${key}`;
    return has(specificKey) ? get(specificKey) : get(defaultKey);
  };
}

function setPrefixed(prefix) {
  return (key, value) => {
    set(`${prefix}.${key}`, value);
  };
}

// defaults, should be moved to JSON file
set('defaults.requestTimeout', 5000);
set('commerce-api.checkout.baseUrl', 'http://some-checkout-url.example.com:8080');
set('commerce-api.checkout.serviceName', 'commerce-api checkout');
set('commerce-api.shopping.baseUrl', 'http://some-shopping-url.example.com:8080');
set('commerce-api.shopping.serviceName', 'commerce-api shopping');

function getServices() {
  const allKeys = _.keys(_.get(store, 'clients'));
  return _.without(allKeys, 'defaults');
}

function setEffectiveUrls() {
  _.each(getServices(), service => {
    const subServices = _.keys(get(service));

    _.each(subServices, subService => {
      const prefix = `${service}.${subService}`;
      set(`${prefix}.effectiveUrl`, get(`${prefix}.baseUrl`));
    });
  });
}

setEffectiveUrls();

export default function getConfig(prefix) {
  if (prefix) {
    return {get: getPrefixed(prefix), set: setPrefixed(prefix)};
  } else {
    return {get, set, getServices, setEffectiveUrls};
  }
}
