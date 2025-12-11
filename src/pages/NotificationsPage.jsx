import { useState } from "react"
import { Bell, Check, User, MessageSquare, Trash2 } from "lucide-react"

const MOCK_NOTIFICATIONS = [
  { id: 1, type: "system", title: "Welcome Bonus", message: "You received 20 credits as a welcome bonus!", time: "Just now", read: false },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const getIcon = (type) => {
    switch (type) {
      case 'trade_request': return <User size={20} className="text-blue-500" />;
      case 'message': return <MessageSquare size={20} className="text-indigo-500" />;
      case 'trade_confirmed': return <Check size={20} className="text-emerald-500" />;
      default: return <Bell size={20} className="text-slate-500" />;
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 font-sans">
      <main className="max-w-[800px] mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground mb-2">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with your latest activities.</p>
          </div>
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="text-sm font-semibold text-rose-500 hover:text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          {notifications.length > 0 ? (
            <div className="divide-y divide-border">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 flex gap-5 group transition-colors ${notification.read ? 'bg-white hover:bg-slate-50' : 'bg-indigo-50/40 hover:bg-indigo-50/60'}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${notification.read ? 'bg-slate-100' : 'bg-white shadow-sm border border-indigo-100'}`}>
                    {getIcon(notification.type)}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className={`text-base font-bold ${notification.read ? 'text-slate-700' : 'text-slate-900'}`}>
                        {notification.title}
                        {!notification.read && <span className="ml-2 w-2 h-2 bg-rose-500 rounded-full inline-block align-middle mb-0.5"></span>}
                      </h3>
                      <span className="text-xs font-semibold text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className={`mt-1 text-sm ${notification.read ? 'text-muted-foreground' : 'text-slate-800 font-medium'}`}>
                      {notification.message}
                    </p>

                    <div className="mt-3 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                        >
                          <Check size={14} /> Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-xs font-bold text-slate-400 hover:text-rose-500 flex items-center gap-1"
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No new notifications</h3>
              <p className="text-slate-500 mt-1">You're all caught up!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
