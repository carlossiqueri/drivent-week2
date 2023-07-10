import { Router } from 'express';
import { authenticateToken, validateBody } from '../middlewares';
import { getTickets, getTicketsTypes, newTicket } from '../controllers/tickets-controller';
import { ticketSchema } from '../schemas/tickets-schema';

const ticketsRouter = Router();

ticketsRouter.get('/types', authenticateToken, getTicketsTypes);
ticketsRouter.get('/', authenticateToken, getTickets);
ticketsRouter.post('/', authenticateToken, validateBody(ticketSchema), newTicket);

export { ticketsRouter };

