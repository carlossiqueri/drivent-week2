import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares';
import paymentsService from '../services/payments-service';
import httpStatus from 'http-status';

export async function getPaymentsByTicketId(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const { ticketId } = req.query;

  const ticket = await paymentsService.getPaymentsByTicketId(Number(ticketId), userId);
  res.status(httpStatus.OK).send(ticket);
}

export type CardData = {
  issuer: string;
  number: number;
  name: string;
  expirationDate: Date;
  cvv: number;
};

export async function createPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketId, cardData }: { ticketId: string; cardData: CardData } = req.body;
  const userId = req.userId;

  const payment = await paymentsService.createPayment(Number(ticketId), cardData, userId);
  res.status(httpStatus.OK).send(payment);
}
