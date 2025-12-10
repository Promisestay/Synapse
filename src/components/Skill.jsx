import React from 'react'


const Skill = () => {
  return (
    <div>
        <div className="mb-12">
            <h3 className="text-xl font-bold text-slate-700 mb-6">Primary Skill</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Skill Name</label>
                <input
                  type="text"
                  value={profile.skillName}
                  onChange={(e) => setProfile({ ...profile, skillName: e.target.value })}
                  placeholder="e.g., JavaScript, Graphic Design"
                  className="w-full bg-slate-200/50 rounded-lg p-3 text-slate-900 font-medium border border-transparent focus:border-purple-300 focus:bg-white transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Skill Level</label>
                <select
                  value={profile.skillLevel}
                  onChange={(e) => setProfile({ ...profile, skillLevel: e.target.value })}
                  className="w-full bg-slate-200/50 rounded-lg p-3 text-slate-900 font-medium border border-transparent focus:border-purple-300 focus:bg-white transition-all outline-none"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>
          </div>

          {/* Skills I Can Teach */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-slate-700 mb-6">Additional Skills I Can Teach</h3>
            <div className="flex flex-wrap gap-4">
              {profile.teach.length > 0 ? profile.teach.map((skill, index) => (
                <div key={index} className="bg-slate-200/50 px-4 py-3 rounded-lg text-sm font-bold text-slate-700 text-center border border-transparent hover:border-slate-300 transition-colors flex items-center gap-2 group">
                  {skill}
                  <button
                    onClick={() => removeTeachSkill(index)}
                    className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X size={14} />
                  </button>
                </div>
              )) : (
                <div className="text-slate-400 text-sm italic py-2">No additional skills listed yet.</div>
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
                <div key={index} className="bg-slate-200/50 px-4 py-3 rounded-lg text-sm font-bold text-slate-700 text-center border border-transparent hover:border-slate-300 transition-colors flex items-center gap-2 group">
                  {skill}
                  <button
                    onClick={() => removeLearnSkill(index)}
                    className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X size={14} />
                  </button>
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

    </div>
  )
}

export default Skill