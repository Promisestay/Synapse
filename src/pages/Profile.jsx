import { useState, useEffect } from "react"
import { Loader, Camera, Plus, X, ArrowRight } from "lucide-react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../lib/axios"
import { toast } from "sonner"
import ConfirmModal from "../components/ConfirmModal"
import AddTeachSkillModal from "../components/skills/AddTeachSkillModal"
import AddLearnSkillModal from "../components/skills/AddLearnSkillModal"
import { getLearn, getSkills } from "../lib/queries"

export default function Profile() {
  const { data, refetch } = useQuery({
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

  // Modal State
  const [teachModalOpen, setTeachModalOpen] = useState(false)
  const [learnModalOpen, setLearnModalOpen] = useState(false)

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
      await axiosInstance.patch("/user/profile", formData)
    },
    onSuccess: () => {
      refetch()
      toast.success("Profile updated")
    },
  })

  const { data: skills, refetch: refetchSkills } = getSkills()


  const { data: learn, refetch: refetchLearn } = getLearn()

  const { mutateAsync: deleteTeachSkill, isPending: isDeletingSkill } = useMutation({
    mutationFn: async (id) => {
      await axiosInstance.delete(`/user/skills/${id}`)
    },
    onSuccess: () => {
      refetchSkills()
      toast.success("Skill removed")
    },
  })

  const { mutateAsync: deleteTeachLearn, isPending: isDeletingLearn } = useMutation({
    mutationFn: async (id) => {
      await axiosInstance.delete(`/user/learn/${id}`)
    },
    onSuccess: () => {
      refetchLearn()
      toast.success("Learning Preference removed")
    },
  })

  function handleSave() {
    const { fullName, email, bio, about: aboutMe } = profile
    mutate({ fullName, email, bio, aboutMe })
  }

  const [skillDeleteId, setSkillDeteId] = useState("")
  const [learnDeleteId, setLearnDeteId] = useState("")
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

          <div className="h-px bg-slate-200 w-full mt-8 mb-12"></div>

          {/* Skills Sections */}
          <div className="space-y-12 mb-12">
            {/* Skills I Can Teach */}
            <div>
              <h3 className="text-lg font-bold text-slate-700 mb-6">Skills I Can Teach</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills?.map((skill, i) => (
                  <div
                    key={skill.id}
                    className="bg-slate-200/50 rounded-lg p-1.5 pr-3 flex items-center justify-between group hover:bg-slate-200 transition-colors"
                  >
                    <span className="px-3 text-slate-700 font-bold text-sm">{skill.name}</span>
                    <span className="px-3 text-slate-700 font-bold text-sm">Credit: {skill.credit}</span>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                          skill.level === "Beginner"
                            ? "bg-white text-rose-500 border-rose-200"
                            : skill.level === "Intermediate"
                            ? "bg-purple-100 text-purple-600 border-purple-200"
                            : "bg-white text-emerald-600 border-emerald-200"
                        }`}
                      >
                        {skill.level}
                      </span>
                      <button
                        onClick={() => setSkillDeteId(skill.id)}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setTeachModalOpen(true)}
                  className="bg-slate-200/50 rounded-lg p-3 flex items-center justify-center gap-2 text-slate-500 font-bold text-sm hover:bg-slate-200 transition-colors border-2 border-dashed border-slate-300 hover:border-slate-400"
                >
                  <Plus size={16} /> Add Skill
                </button>
              </div>
            </div>

            {/* Skills I Want to Learn */}
            <div>
              <h3 className="text-lg font-bold text-slate-700 mb-6">Skills I Want to Learn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learn?.map((learn, i) => (
                  <div
                    key={learn.id}
                    className="bg-slate-200/50 rounded-lg p-3 flex items-center justify-between group hover:bg-slate-200 transition-colors"
                  >
                    <span className="text-slate-700 font-bold text-sm">{learn.name}</span>
                    <button
                      onClick={() => setLearnDeteId(learn.id)}
                      className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setLearnModalOpen(true)}
                  className="bg-slate-200/50 rounded-lg p-3 flex items-center justify-center gap-2 text-slate-500 font-bold text-sm hover:bg-slate-200 transition-colors border-2 border-dashed border-slate-300 hover:border-slate-400"
                >
                  <Plus size={16} /> Add Skill
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddTeachSkillModal
        isOpen={teachModalOpen}
        onClose={() => setTeachModalOpen(false)}
        refetch={refetchSkills}
      />

      <AddLearnSkillModal
        isOpen={learnModalOpen}
        onClose={() => setLearnModalOpen(false)}
        refetch={refetchLearn}
      />

      {Boolean(skillDeleteId) && (
        <ConfirmModal
          onClose={() => setSkillDeteId("")}
          onConfirm={async () => {
            await deleteTeachSkill(skillDeleteId)
            refetch()
          }}
          isLoading={isDeletingSkill}
          message="Are you sure you want to remove this skill?"
        />
      )}

      {Boolean(learnDeleteId) && (
        <ConfirmModal
          onClose={() => setLearnDeteId("")}
          onConfirm={async () => {
            await deleteTeachLearn(learnDeleteId)
            refetch()
          }}
          isLoading={isDeletingLearn}
          message="Are you sure you want to remove this skill?"
        />
      )}
    </div>
  )
}
