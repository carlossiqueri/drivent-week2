import { prisma } from '../../config';
import { CardData } from '../../controllers/payments-controller';

async function getPaymentsByTicketId(ticketId: number) {
  return await prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function createPayment(ticketId: number, value: number, cardData: CardData) {
  return await prisma.payment.create({
    data: {
      ticketId,
      value,
      cardIssuer: cardData.issuer,
      cardLastDigits: cardData.number.toString().slice(-4),
    },
  });
}

const paymentsRepository = {
  getPaymentsByTicketId,
  createPayment,
};

export default paymentsRepository;
