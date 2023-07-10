import { Router } from 'express';
import { authenticateToken, validateBody } from '../middlewares';
import { createPayment, getPaymentsByTicketId } from '../controllers/payments-controller';
import { paymentsSchema } from '../schemas/payment-schema';

const paymentsRouter = Router();

paymentsRouter.get('/', authenticateToken, getPaymentsByTicketId);
paymentsRouter.post('/process', authenticateToken, validateBody(paymentsSchema), createPayment);

export { paymentsRouter };
