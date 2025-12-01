import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes/index.js';
// Если rateLimit мешает тестам, можно временно закомментировать
import { apiLimiter } from './middleware/rateLimitMiddleware.js'; 
import errorMiddleware from './middleware/errorMiddleware.js';

const app = express();

// РАЗРЕШАЕМ ВСЁ (CORS Fix)
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'OSINT-Map Backend' });
});

app.use('/api', apiLimiter, routes);

app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Not found' });
});

app.use(errorMiddleware);

const port = process.env.PORT || 4000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`🚀 Server listening on port ${port}`);
  });
}

export default app;
