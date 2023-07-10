import { CardData } from '../../controllers/payments-controller';
import { cannotEnrollBeforeStartDateError, notFoundError, unauthorizedError } from '../../errors';
import enrollmentRepository from '../../repositories/enrollment-repository';
import paymentsRepository from '../../repositories/payments-repository';
import ticketsRepository from '../../repositories/tickets-repository';

async function getPaymentsByTicketId(ticketId: number, userId: number) {
  if (!ticketId) {
    throw cannotEnrollBeforeStartDateError();
  }

  const ticket = await ticketsRepository.getTicketsById(ticketId);

  if (!ticket) {
    throw notFoundError();
  }

  const enrollment = await enrollmentRepository.getEnrollmentByUserId(userId);

  if (enrollment.id !== ticket.enrollmentId) {
    throw unauthorizedError();
  }

  return await paymentsRepository.getPaymentsByTicketId(ticketId);
}

async function createPayment(ticketId: number, cardData: CardData, userId: number) {
  if (!ticketId || !cardData) {
    throw cannotEnrollBeforeStartDateError();
  }

  const ticket = await ticketsRepository.getTicketsById(ticketId);

  if (!ticket) {
    throw notFoundError();
  }

  const enrollment = await enrollmentRepository.getEnrollmentByUserId(userId);

  if (enrollment.id !== ticket.enrollmentId) {
    throw unauthorizedError();
  }

  const paymentPrice = await ticketsRepository.getTicketType(ticket.ticketTypeId);

  const newPaymentTicket = await paymentsRepository.createPayment(ticketId, paymentPrice.price, cardData);

  if (newPaymentTicket) {
    await ticketsRepository.updateTicket(ticket.id);
  }

  return newPaymentTicket;
}

const paymentsService = {
  getPaymentsByTicketId,
  createPayment,
};

export default paymentsService;
