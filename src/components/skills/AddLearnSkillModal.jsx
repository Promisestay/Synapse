import { useState } from "react"
import { X } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"
import { toast } from "sonner"

export default function AddLearnSkillModal({ isOpen, onClose, refetch }) {
    const [form, setForm] = useState({ name: "" })
    const { isPending, mutate } = useMutation({
        mutationFn: async (formData) => {
            const { data } = await axiosInstance.post("/user/skills", formData)
            return data
        },
        onSuccess: () => {
            toast.success("Skill added succesfully")
            refetch()
            setForm({ name: "" })
            onClose()
        },
    })

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-slate-800 mb-6">Add Skills</h3>

                <div className="mb-8">
                    {/* Skills Input */}
                    <div className="bg-slate-200/50 rounded-lg px-4 py-3 flex items-center gap-2 relative">
                        <input
                            type="text"
                            name="name"
                            className="w-full bg-transparent border-none outline-none font-bold text-slate-700 placeholder:text-slate-500 text-sm"
                            placeholder="Skills"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={() => mutate(form)}
                        disabled={isPending}
                        className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isPending ? "Loading..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    )
}
