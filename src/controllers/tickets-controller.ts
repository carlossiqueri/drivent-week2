import { Response } from 'express';
import ticketsServices from '../services/tickets-service';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '../middlewares';

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  const ticketsTypes = await ticketsServices.getTicketsTypes();
  res.status(httpStatus.OK).send(ticketsTypes);
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const tickets = await ticketsServices.getTickets(userId);
  res.status(httpStatus.OK).send(tickets);
}

export async function newTicket(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const { ticketTypeId } = req.body;
  const createdTicket = await ticketsServices.newTicket(userId, ticketTypeId);
  res.status(httpStatus.CREATED).send(createdTicket);
}
