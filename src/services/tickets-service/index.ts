import enrollmentRepository from '../../repositories/enrollment-repository';
import ticketsRepository from '../../repositories/tickets-repository';
import enrollmentsService from '../enrollments-service';

async function getTicketsTypes() {
  return await ticketsRepository.getTicketsTypes();
}

async function getTickets(userId: number) {
  // userId está relacionado ao model enrollments que por sua vez está relacionado com o model tickets
  const enrollment = await enrollmentsService.getEnrollmentByUserId(userId);
  const userTickets = await ticketsRepository.getTickets(enrollment.id);
  if (!userTickets) {
    throw {
      name: 'NotFoundError',
      message: "User Ticket not found or don't exist",
    };
  }

  return userTickets;
}

async function newTicket(userId: number, ticketTypeId: number) {
  // userId está relacionado ao model enrollments que por sua vez está relacionado com o model tickets
  // mesma operação utilizada na função getTickets uma vez que ambas precisam relacionar user => ticket
  const enrollment = await enrollmentsService.getEnrollmentByUserId(userId);
  await ticketsRepository.newTicket(enrollment.id, ticketTypeId);
  return await ticketsRepository.getTickets(enrollment.id);
}

const ticketsServices = {
  getTicketsTypes,
  getTickets,
  newTicket,
};

export default ticketsServices;
