import api from './axios'

export interface Ticket {
  id: number
  title: string
  description: string
  category: string
  status: 'OPEN' | 'ANSWERED' | 'CLOSED'
  adminResponse?: string
  createdAt: string
  username: string
}

export interface CreateTicketRequest {
  title: string
  description: string
  category: string
}

export const getMyTickets = async () => {
  const response = await api.get<{ data: Ticket[] }>('/tickets/my')
  return response.data.data
}

export const createTicket = async (ticket: CreateTicketRequest) => {
  const response = await api.post<{ data: Ticket }>('/tickets', ticket)
  return response.data.data
}

export const getTicketsByStatus = async (status: 'OPEN' | 'ANSWERED' | 'CLOSED') => {
  const response = await api.get<{ data: Ticket[] }>(`/tickets/status/${status}`)
  return response.data.data
}

export const answerTicket = async (
  ticketId: number,
  responseText: string,
  status: 'ANSWERED' | 'CLOSED'
) => {
  const response = await api.put<{ data: Ticket }>(
    `/tickets/${ticketId}/answer`,
    { response: responseText, status }
  )
  return response.data.data
}