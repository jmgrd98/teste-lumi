const swaggerDefinition = {
  openapi: '3.0.0',
  components: {
    schemas: {
      Fatura: {
        type: 'object',
        // ... properties of the Fatura schema
      },
    },
  },
  info: {
    title: 'Teste Lumi API',
    version: '1.0.0',
    description: 'API para gerenciamento de faturas de energia elétrica',
  },
  servers: [
    {
      url: 'http://localhost:8080',
      description: 'Local server',
    },
  ],
};

const options = {
swaggerDefinition,
apis: ['./routes/*.ts'],
};

export default options;
