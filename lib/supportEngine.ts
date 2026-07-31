import { prisma } from "@/lib/prisma";
export async function listTickets(userId: string) {
  return prisma.supportTicket.findMany({ where: { userId }, include: { messages: true }, orderBy: { updatedAt: "desc" } });
}
export async function createTicket(userId: string, data: { subject: string; category: string; description: string; priority?: string }) {
  return prisma.supportTicket.create({ data: { userId, ...data } });
}
export async function addTicketMessage(userId: string, ticketId: string, body: string) {
  const ticket = await prisma.supportTicket.findFirst({ where: { id: ticketId, userId } });
  if (!ticket) throw new Error("SUPPORT_TICKET_NOT_FOUND");
  return prisma.supportTicketMessage.create({ data: { ticketId, authorId: userId, body } });
}
