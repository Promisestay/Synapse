import { useState, useEffect } from "react"
import { Loader, Camera, Plus, X, ArrowRight } from "lucide-react"
import { useAuthStore } from "../store/useAuthStore"
import { useMutation, useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../lib/axios"
import { toast } from "sonner"

export default function Profile() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/user/profile")
      return data
    },
  })
  // Initialize from currentUser
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    bio: "",
    about: "",
    skillName: "",
    skillLevel: "",
    teach: [],
    learn: [],
  })
  useEffect(() => {
    if (data) {
      const { email, fullName, bio, aboutMe } = data
      setProfile((prev) => {
        return { ...prev, email, fullName, bio: bio ?? "", about: aboutMe ?? "" }
      })
    }
  }, [data])

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosInstance.patch("/user/profile", formData)
    },
    onSuccess: () => {
      refetch()
      toast.success("Profile updated")
    },
  })

  function handleSave() {
    const { fullName, email, bio, about: aboutMe } = profile
    mutate({ fullName, email, bio, aboutMe })
  }

  // Helper to add skill (simplistic for now)
  const addTeachSkill = () => {
    const skill = prompt("Enter skill to teach:")
    if (skill) {
      setProfile((prev) => ({ ...prev, teach: [...prev.teach, skill] }))
    }
  }

  const removeTeachSkill = (index) => {
    setProfile((prev) => ({
      ...prev,
      teach: prev.teach.filter((_, i) => i !== index),
    }))
  }

  const addLearnSkill = () => {
    const skill = prompt("Enter skill you want to learn:")
    if (skill) {
      setProfile((prev) => ({ ...prev, learn: [...prev.learn, skill] }))
    }
  }

  const removeLearnSkill = (index) => {
    setProfile((prev) => ({
      ...prev,
      learn: prev.learn.filter((_, i) => i !== index),
    }))
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
                {(data?.fullName?.charAt(0) ?? "U").toUpperCase()}
              </div>
              <button className="absolute bottom-1 right-1 p-2 bg-white rounded-full shadow-md border border-slate-100 text-slate-600 hover:text-purple-600 transition-colors">
                <Camera size={18} />
              </button>
            </div>

            {/* Main Info Fields */}
            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  className="w-full bg-slate-200/50 rounded-lg p-3 text-slate-900 font-medium border border-transparent focus:border-purple-300 focus:bg-white transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  value={data?.email ?? ""}
                  disabled
                  className="w-full bg-slate-100 rounded-lg p-3 text-slate-500 font-medium border border-transparent cursor-not-allowed"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Bio
                </label>
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
              <div className="absolute bottom-3 left-6 text-[10px] text-slate-400">
                {profile.about.length} characters
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={handleSave}
              disabled={isPending}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white flex justify-center items-center gap-2 font-bold rounded-lg shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5"
            >
              {isPending ? (
                <Loader className="animate-spin" />
              ) : (
                <>
                  <span>Save Changes</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
