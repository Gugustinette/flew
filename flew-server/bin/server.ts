/**
 * server.js
 * Run the server
*/

// App Dependencies
import app from '../app';

/**
 * Get port from environment
 */
const port = process.env.PORT || '7761';

/**
 * Listen on provided port, on all network interfaces.
 */

app.listen(port, () => console.log(`API running on localhost:${port}`));
