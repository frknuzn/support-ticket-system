// src/pages/UserDashboard.tsx
import { useEffect, useState } from "react"
import { getMyTickets, createTicket, Ticket } from "@/api/ticket"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

export default function UserDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchTickets = async () => {
    try {
      const data = await getMyTickets()
      setTickets(data)
    } catch {
      setError("Failed to load tickets")
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .required("Description is required"),
    category: Yup.string().required("Category is required"),
  })

  return (
  <div className="pt-4 pr-4">
    <h1 className="text-2xl font-bold mb-6 text-[#2F3E9E]">My Tickets</h1>

    {error && <p className="text-red-500">{error}</p>}

    {/* Ticket List önce */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
      {tickets.length === 0 ? (
        <p className="text-gray-500">No tickets found.</p>
      ) : (
        tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white border border-gray-200 rounded-xl shadow-md p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-700">{ticket.title}</h2>
              <span className="text-xs font-medium text-white bg-[#2F3E9E] px-2 py-1 rounded">
                {ticket.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {ticket.category} | {new Date(ticket.createdAt).toLocaleString()}
            </p>
            <p className="mt-3 text-gray-700">{ticket.description}</p>

            {ticket.adminResponse && (
              <p className="mt-3 text-green-600 text-sm">
                Admin Response: {ticket.adminResponse}
              </p>
            )}
          </div>
        ))
      )}
    </div>

    {/* Create Ticket Form sonra */}
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-[#2F3E9E] mb-4">Create New Ticket</h2>

      <Formik
        initialValues={{ title: "", description: "", category: "General" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          setLoading(true)
          try {
            await createTicket(values)
            await fetchTickets()
            resetForm()
          } catch {
            setError("Failed to create ticket")
          } finally {
            setLoading(false)
          }
        }}
      >
        {() => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="title" className="block font-semibold text-sm text-gray-700 mb-1">
                Title
              </label>
              <Field
                name="title"
                type="text"
                placeholder="Enter ticket title"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F3E9E]"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="description" className="block font-semibold text-sm text-gray-700 mb-1">
                Description
              </label>
              <Field
                name="description"
                as="textarea"
                rows={4}
                placeholder="Enter detailed description"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F3E9E]"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="category" className="block font-semibold text-sm text-gray-700 mb-1">
                Category
              </label>
              <Field
                name="category"
                as="select"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2F3E9E]"
              >
                <option value="General">General</option>
                <option value="Technical">Technical</option>
                <option value="Billing">Billing</option>
              </Field>
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2F3E9E] hover:bg-[#3E4B5B] text-white py-2 rounded-md"
            >
              {loading ? "Creating..." : "Create Ticket"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
)
}