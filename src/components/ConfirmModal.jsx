export default function ConfirmModal({ onClose, onConfirm, message, isLoading }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-1000">
      <div className="bg-white w-[90%] max-w-sm rounded-xl shadow-xl p-6">
        <p className="text-slate-700 text-sm mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg bg-slate-200 hover:bg-slate-300"
          >
            Cancel
          </button>

          <button
            disabled={isLoading}
            onClick={async () => {
              await onConfirm()
              onClose()
            }}
            className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400"
          >
            {isLoading ? "Loading..." : "Yes, Remove"}
          </button>
        </div>
      </div>
    </div>
  )
}
