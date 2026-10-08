import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentación - Supabase',
      version: '1.0.0',
      description: 'Endpoints conectados a Supabase',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Introduce tu token de Administrador aquí (Ejemplo: Bearer <tu_token>)',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('📄 Swagger UI disponible en http://localhost:3001/api/docs');
};

export default swaggerDocs;