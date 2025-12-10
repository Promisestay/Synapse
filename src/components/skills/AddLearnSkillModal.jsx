import { useState } from "react"
import { X } from "lucide-react"

export default function AddLearnSkillModal({ isOpen, onClose, onSave }) {
    const [name, setName] = useState("")

    if (!isOpen) return null

    const handleSave = () => {
        if (!name.trim()) return
        onSave({ name })
        setName("")
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-slate-800 mb-6">Add Skills</h3>

                <div className="mb-8">
                    {/* Skills Input */}
                    <div className="bg-slate-200/50 rounded-lg px-4 py-3 flex items-center gap-2 relative">
                        <input
                            type="text"
                            className="w-full bg-transparent border-none outline-none font-bold text-slate-700 placeholder:text-slate-500 text-sm"
                            placeholder="Skills"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={!name.trim()}
                        className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}
