import express from 'express';
import cors from 'cors';
import faturaRoutes from './routes/faturaRoutes';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './swaggerConfig';
import swaggerUi from 'swagger-ui-express';

export const app: any = express();
const port: number = 8080;
const specs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/faturas', faturaRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
