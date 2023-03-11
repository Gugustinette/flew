/**
 * gateway.js
 * Run the Gateway
*/

// Gateway Dependencies
const gateway = require('../app');

/**
 * Get port from environment
 */
const port = process.env.PORT || '7762';

/**
 * Listen on provided port, on all network interfaces.
*/

gateway.listen(port, () => console.log(`Gateway running on localhost:${port}`));
