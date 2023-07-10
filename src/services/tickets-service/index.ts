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
      name: 'NotFoundErorr',
      message: "Enrollment not found or don't exist",
    };
  }

  return userTickets;
}

async function newTicket(userId: number, ticketTypeId: number) {
  // userId está relacionado ao model enrollments que por sua vez está relacionado com o model tickets
  // mesma operação utilizada na função getTickets uma vez que ambas precisam relacionar user => ticket
  const enrollment = await enrollmentsService.getEnrollmentByUserId(userId);
  if (!enrollment){
    throw {
        name: 'notFoundError',
        message: 'User not found!'
    }
  }
  if(!ticketTypeId){
    throw{
        name: 'BadRequestError',
        message: 'Could not find ticketTypeId'
    }
  }
  await ticketsRepository.newTicket(enrollment.id, userId);
  return await ticketsRepository.getTickets(enrollment.id);
}

const ticketsServices = {
  getTicketsTypes,
  getTickets,
  newTicket,
};

export default ticketsServices;
