/**
 * app.js
 * Define the server side application
 * 
 * /routes - Contains all routes
 * /models - Contains all models
 * /controllers - Contains all controllers
 * /socket - Contains all socket events
 */

// App Dependencies
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Routes Dependencies
import userRouter from './routes/user';
import flewRouter from './routes/flew';
import categoryRouter from './routes/category';
import roomRouter from './routes/room';
import messageRouter from './routes/message';

// Swagger Dependencies
import expressJSDocSwagger from 'express-jsdoc-swagger';

/**
 * Success Delete Type
 * @typedef {object} SuccessDelete
 * @property {string} message - The message of success
 */
const options = {
  info: {
    version: '1.0.0',
    title: 'Flew Rest API',
    description: 'Flew Rest API Documentation',
    license: {
      name: 'MIT',
    },
  },
  security: { // Bearer Token
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  baseDir: __dirname,
  // Global patterns to find jsdoc files (multiple patterns can be added in an array)
  filesPattern: ['./documentation/*.ts', './routes/*.ts', './models/*.ts'],
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api-docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // UI options
  swaggerUiOptions: {},
} as any;



// App Initialization
const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
        credentials: true
    }
));

// Configure Routes
const routeOrigin = (process.env.NODE_ENV === 'dev' ? '/api' : '');
app.use(routeOrigin + '/user', userRouter);
app.use(routeOrigin + '/flew', flewRouter);
app.use(routeOrigin + '/category', categoryRouter);
app.use(routeOrigin + '/room', roomRouter);
app.use(routeOrigin + '/message', messageRouter);

// Configure Swagger
expressJSDocSwagger(app)(options);

// MongoDB Connection
mongoose.connect('mongodb://flew-db:27017/flew', {useUnifiedTopology: true, useNewUrlParser: true} as any);



export default app;
