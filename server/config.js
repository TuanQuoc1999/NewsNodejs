/**
 * The config for server
 */

export const SERVER_PORT = process.env.SERVER_PORT;
let serverOrigin = process.env.SERVER_ORIGIN || '*';
try {
  serverOrigin = JSON.parse(serverOrigin);
} catch (e) {
  console.log(`Server Origin is ${serverOrigin}`);
}
export const CORS_OPTIONS = {
  // Find and fill your options here: https://github.com/expressjs/cors#configuration-options
  origin: serverOrigin,
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization,Accept-Language',
};
export const API_DOCS_HOST = process.env.API_DOCS_HOST;
// Service config
export const MONGO_URI = process.env.MONGO_URI;
// Auth
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
