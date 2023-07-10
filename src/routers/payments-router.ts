import { Router } from 'express';
import { authenticateToken } from '../middlewares';
import { getPaymentsByTicketId } from '../controllers/payments-controller';

const paymentsRouter = Router();

paymentsRouter.get('/', authenticateToken, getPaymentsByTicketId);
paymentsRouter.post('/');

export { paymentsRouter };
