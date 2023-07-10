import { cannotEnrollBeforeStartDateError, notFoundError, unauthorizedError } from '../../errors';
import enrollmentRepository from '../../repositories/enrollment-repository';
import paymentsRepository from '../../repositories/payments-repository';
import ticketsRepository from '../../repositories/tickets-repository';

async function getPaymentsByTicketId(ticketId: number, userId: number) {
    console.log(ticketId)
  if (!ticketId) {
    throw cannotEnrollBeforeStartDateError();
  }

  const ticket = await ticketsRepository.getTicketsById(ticketId);

//   if (!ticket) {
//     throw notFoundError();
//   }

  console.log("service end");

  const enrollment = await enrollmentRepository.getEnrollmentByUserId(userId);

  if (enrollment.id !== ticket.enrollmentId) {
    throw unauthorizedError();
  }


  return await paymentsRepository.getPaymentsByTicketId(ticketId);
}

const paymentsService = {
  getPaymentsByTicketId,
};

export default paymentsService;
