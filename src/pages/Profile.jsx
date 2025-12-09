import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { Camera, Plus } from "lucide-react"

export default function Profile() {
  const { currentUser, updateProfile } = useContext(AuthContext)
  const [isEditing, setIsEditing] = useState(false)

  // Initialize from currentUser
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    about: "",
    teach: [],
    learn: []
  })

  // Update state when currentUser changes (e.g. on load)
  useEffect(() => {
    if (currentUser) {
      setProfile({
        name: currentUser.name || "",
        email: currentUser.email || "",
        bio: currentUser.bio || "",
        about: currentUser.about || "",
        teach: Array.isArray(currentUser.teach) ? currentUser.teach : (currentUser.teach ? [currentUser.teach] : []),
        learn: Array.isArray(currentUser.learn) ? currentUser.learn : (currentUser.learn ? [currentUser.learn] : [])
      })
    }
  }, [currentUser])

  const handleSave = () => {
    updateProfile(profile)
    setIsEditing(false)
    alert("Profile saved!")
  }

  // Helper to add skill (simplistic for now)
  const addTeachSkill = () => {
    const skill = prompt("Enter skill to teach:")
    if (skill) {
      setProfile(prev => ({ ...prev, teach: [...prev.teach, skill] }))
    }
  }

  const addLearnSkill = () => {
    const skill = prompt("Enter skill you want to learn:")
    if (skill) {
      setProfile(prev => ({ ...prev, learn: [...prev.learn, skill] }))
    }
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 font-sans">
      <div className="max-w-[1000px] mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">

        <div className="p-8 md:p-12">

          {/* Top Section: Avatar + Fields */}
          <div className="flex flex-col md:flex-row gap-10 items-start mb-12">

            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-32 h-32 rounded-full bg-blue-800 text-white flex items-center justify-center text-5xl font-bold border-4 border-white shadow-lg uppercase">
                {profile.name.charAt(0) || "U"}
              </div>
              <button className="absolute bottom-1 right-1 p-2 bg-white rounded-full shadow-md border border-slate-100 text-slate-600 hover:text-purple-600 transition-colors">
                <Camera size={18} />
              </button>
            </div>

            {/* Main Info Fields */}
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-slate-200/50 rounded-lg p-3 text-slate-900 font-medium border border-transparent focus:border-purple-300 focus:bg-white transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full bg-slate-100 rounded-lg p-3 text-slate-500 font-medium border border-transparent cursor-not-allowed"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Bio</label>
                <input
                  type="text"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  placeholder="Short bio..."
                  className="w-full bg-slate-200/50 rounded-lg p-3 text-slate-900 font-medium border border-transparent focus:border-purple-300 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-200 w-full mb-12"></div>

          {/* About Me */}
          <div className="mb-12">
            <h3 className="text-lg font-bold text-slate-700 mb-4">About me</h3>
            <div className="bg-slate-200/50 rounded-xl p-4 md:p-6 pb-8 relative group focus-within:bg-white focus-within:ring-2 focus-within:ring-purple-100 transition-all">
              <textarea
                className="w-full bg-transparent border-none focus:ring-0 text-slate-700 text-sm leading-relaxed resize-none p-0 outline-none"
                rows="3"
                value={profile.about}
                onChange={(e) => setProfile({ ...profile, about: e.target.value })}
                placeholder="Tell us about yourself..."
              ></textarea>
              <div className="absolute bottom-3 left-6 text-[10px] text-slate-400">{profile.about.length} characters</div>
            </div>
          </div>

          {/* Skills I Can Teach */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-slate-700 mb-6">Skills I Can Teach</h3>
            <div className="flex flex-wrap gap-4">
              {profile.teach.length > 0 ? profile.teach.map((skill, index) => (
                <div key={index} className="bg-slate-200/50 px-4 py-3 rounded-lg text-sm font-bold text-slate-700 text-center border border-transparent hover:border-slate-300 transition-colors">
                  {skill}
                </div>
              )) : (
                <div className="text-slate-400 text-sm italic py-2">No skills listed yet.</div>
              )}
              <button
                onClick={addTeachSkill}
                className="flex items-center justify-center gap-2 bg-slate-200 hover:bg-slate-300 px-4 py-3 rounded-lg text-sm font-bold text-slate-700 transition-colors"
              >
                <Plus size={16} /> Add Skill
              </button>
            </div>
          </div>

          {/* Skills I Want to Learn */}
          <div className="mb-16">
            <h3 className="text-xl font-bold text-slate-700 mb-6">Skills I Want to Learn</h3>
            <div className="flex flex-wrap gap-4">
              {profile.learn.length > 0 ? profile.learn.map((skill, index) => (
                <div key={index} className="bg-slate-200/50 px-4 py-3 rounded-lg text-sm font-bold text-slate-700 text-center border border-transparent hover:border-slate-300 transition-colors">
                  {skill}
                </div>
              )) : (
                <div className="text-slate-400 text-sm italic py-2">No learning interests listed yet.</div>
              )}
              <button
                onClick={addLearnSkill}
                className="flex items-center justify-center gap-2 bg-slate-200 hover:bg-slate-300 px-4 py-3 rounded-lg text-sm font-bold text-slate-700 transition-colors"
              >
                <Plus size={16} /> Add Skill
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button className="px-8 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg transition-colors">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5"
            >
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
