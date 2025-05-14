import { useEffect, useState } from "react"
import { getTicketsByStatus, answerTicket, Ticket } from "@/api/ticket"

export default function AdminDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [statusFilter, setStatusFilter] = useState<"OPEN" | "ANSWERED" | "CLOSED">("OPEN")
  const [error, setError] = useState("")
  const [activeAnswerId, setActiveAnswerId] = useState<number | null>(null)
  const [answerText, setAnswerText] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<"ANSWERED" | "CLOSED">("ANSWERED")

  const fetchTickets = async () => {
    try {
      const data = await getTicketsByStatus(statusFilter)
      setTickets(data)
    } catch {
      setError("Failed to load tickets")
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [statusFilter])

  const handleAnswerSubmit = async (ticketId: number) => {
    if (!answerText.trim()) return
    try {
      await answerTicket(ticketId, answerText, selectedStatus)
      setAnswerText("")
      setSelectedStatus("ANSWERED")
      setActiveAnswerId(null)
      await fetchTickets()
    } catch {
      setError("Failed to update ticket")
    }
  }

  return (
    <div className="px-8 py-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Ticket Management</h1>

      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm text-gray-600">Filter by status:</span>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value.toUpperCase().trim() as "OPEN" | "ANSWERED" | "CLOSED"
            )
          }
          className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="OPEN">OPEN</option>
          <option value="ANSWERED">ANSWERED</option>
          <option value="CLOSED">CLOSED</option>
        </select>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4">
        {tickets.length === 0 ? (
          <p className="text-gray-500">No tickets found.</p>
        ) : (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-700">{ticket.title}</h2>
                <span className="text-xs font-bold text-white bg-blue-500 px-2 py-1 rounded">
                  {ticket.status}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                {ticket.category} | {new Date(ticket.createdAt).toLocaleString()}
              </p>
              <p className="mt-3 text-gray-700">{ticket.description}</p>
              <p className="mt-2 text-sm text-gray-600">User: {ticket.username}</p>

              {ticket.adminResponse && (
                <p className="mt-2 text-green-600 text-sm">
                  Admin Response: {ticket.adminResponse}
                </p>
              )}

              {ticket.status === "OPEN" && (
                <>
                  {activeAnswerId === ticket.id ? (
                    <div className="mt-4 space-y-3">
                      <textarea
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                        placeholder="Write your response..."
                        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Set new status:</label>
                        <select
                          value={selectedStatus}
                          onChange={(e) =>
                            setSelectedStatus(e.target.value as "ANSWERED" | "CLOSED")
                          }
                          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="ANSWERED">ANSWERED</option>
                          <option value="CLOSED">CLOSED</option>
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAnswerSubmit(ticket.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                        >
                          Submit
                        </button>
                        <button
                          onClick={() => {
                            setActiveAnswerId(null)
                            setAnswerText("")
                            setSelectedStatus("ANSWERED")
                          }}
                          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveAnswerId(ticket.id)}
                      className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                      Answer Ticket
                    </button>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}