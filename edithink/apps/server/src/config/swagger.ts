import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { config } from './env.js';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EdiThink API',
      version: '1.0.0',
      description: 'EdiThink Enterprise Video Conferencing Platform API',
      contact: { name: 'EdiThink Team', email: 'api@edithink.app' },
    },
    servers: [
      { url: 'http://localhost:3001', description: 'Development' },
      { url: 'https://api.edithink.app', description: 'Production' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.ts'],
};

export function setupSwagger(app: Express): void {
  // Only expose API docs in non-production environments
  if (config.NODE_ENV === 'production') {
    console.log('ℹ️  Swagger docs disabled in production.');
    return;
  }
  const specs = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    customSiteTitle: 'EdiThink API Docs',
    customCss: '.swagger-ui .topbar { background-color: #1D4ED8; }',
  }));
  console.log('📄 Swagger docs available at /api-docs');
}
