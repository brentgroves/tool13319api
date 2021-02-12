const toolChangeSummary = require('./tool-change-summary/tool-change-summary.service.js');
const upcomingToolChanges = require('./upcoming-tool-changes/upcoming-tool-changes.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(toolChangeSummary);
  app.configure(upcomingToolChanges);
};
