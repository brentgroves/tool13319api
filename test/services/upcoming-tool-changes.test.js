const assert = require('assert');
const app = require('../../src/app');

describe('\'upcoming-tool-changes\' service', () => {
  it('registered the service', () => {
    const service = app.service('upcoming-tool-changes');

    assert.ok(service, 'Registered the service');
  });
});
