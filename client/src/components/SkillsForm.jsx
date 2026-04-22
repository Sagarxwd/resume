import React, { useState } from "react";
import { Plus, Sparkles, X } from "lucide-react";

const SkillsForm = ({ data = [], onChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    const skill = newSkill.trim();
    if (skill && !data.includes(skill)) {
      onChange([...data, skill]);
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
          Skills
        </h3>
        <p className="text-sm text-gray-500 dark:text-slate-400">
          Add your technical and soft skills
        </p>
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter a skill (e.g., JavaScript, Project Management)"
          className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <button
          type="button"
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="size-4" />
          Add
        </button>
      </div>

      {/* Skills List */}
      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.map((skill, index) => (
            <span
              key={index}
              className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 border dark:border-blue-800 rounded-full text-sm transition-colors"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500 dark:text-slate-400 mt-4">
          <Sparkles className="w-10 h-10 mx-auto mb-2 text-gray-300 dark:text-slate-600" />
          <p>No skills added yet.</p>
          <p className="text-sm">
            Add your technical and soft skills above.
          </p>
        </div>
      )}

      {/* Tip */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg dark:border dark:border-blue-900/50 mt-4">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>Tip:</strong> Add 8–12 relevant skills. Include both technical
          (programming languages, tools) and soft skills (leadership,
          communication).
        </p>
      </div>
    </div>
  );
};

export default SkillsForm;
