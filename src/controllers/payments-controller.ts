import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares';
import paymentsService from '../services/payments-service';
import httpStatus from 'http-status';

export async function getPaymentsByTicketId(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const { ticketId } = req.query;

  const ticket = await paymentsService.getPaymentsByTicketId(userId, Number(ticketId));
  res.status(httpStatus.OK).send(ticket);
}
