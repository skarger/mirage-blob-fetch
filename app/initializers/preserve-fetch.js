export function initialize(/* appInstance */) {
  window.nativeFetch = window.fetch;
}

export default {
  before: 'ember-cli-mirage',
  initialize
};

