import { prisma } from "../../config"

async function getPaymentsByTicketId(ticketId: number) {
    console.log("repository")

    return await prisma.payment.findFirst({
        where: {
            ticketId
        }
    })
}

const paymentsRepository = {
    getPaymentsByTicketId, 
}

export default paymentsRepository