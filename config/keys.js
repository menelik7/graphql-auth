// Figure out what credentials to return
if (process.env.NODE_ENV === 'production') {
  // We are in production - return the prod keys
  module.exports = require('./prod');
} else {
  // We are in development - return the dev keys
  module.exports = require('./dev');
}
