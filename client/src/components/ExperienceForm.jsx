import { Briefcase, Plus, Sparkles, Trash2, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import api from '../configs/api'

const ExperienceForm = ({ data, onChange }) => {
    const [enhancingIndex, setEnhancingIndex] = useState(null);

    const addExperience = () => {
        const newExperience = {
            company: '',
            position: '',
            start_date: '',
            end_date: '',
            description: '',
            is_current: false,
        };
        onChange([...data, newExperience]);
    }

    const removeExperience = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    }

    const updateExperience = (index, field, value) => {
        const updated = [...data];
        updated[index] = { ...updated[index], [field]: value };
        onChange(updated);
    }

    const handleAIEnhance = async (index) => {
        const description = data[index].description;
        if (!description || description.trim().length === 0) {
            toast.error("Please enter a basic description first to enhance.");
            return;
        }

        try {
            setEnhancingIndex(index);
            const response = await api.post('/api/ai/enhance-job-desc', { userContent: description });
            updateExperience(index, "description", response.data.enhanceContent);
            toast.success("Description enhanced successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error enhancing description.");
        } finally {
            setEnhancingIndex(null);
        }
    };

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white'>Professional Experience</h3>
                    <p className='text-sm text-gray-500 dark:text-slate-400'>Add your job experience</p>
                </div>
                <button onClick={addExperience} className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 rounded hover:bg-purple-200 dark:hover:bg-purple-900/60 transition-colors'>
                    <Plus className='size-4' />
                    Add Experience
                </button>
            </div>

            {data.length === 0 ? (
                <div className='text-center py-8 text-gray-500 dark:text-slate-400 mt-4'>
                    <Briefcase className='w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-slate-600' />
                    <p>No work experience added yet.</p>
                    <p className='text-sm'>Click "Add Experience" to get started.</p>
                </div>
            ) : (
                <div className='space-y-4'>
                    {data.map((experience, index) => (
                        <div key={index} className='p-4 border border-gray-200 dark:border-slate-800 rounded-lg space-y-3 transition-colors'>
                            <div className='flex justify-between items-start'>
                                <h4 className="dark:text-white">Experience #{index + 1}</h4>
                                <button onClick={() => removeExperience(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                    <Trash2 className='size-4' />
                                </button>
                            </div>

                            <div className='grid md:grid-cols-2 gap-3'>
                                <input value={experience.company || ""} onChange={(e) => updateExperience(index, "company", e.target.value)} type="text" placeholder='Company Name' className='px-3 py-2 text-sm rounded-lg' />
                                <input value={experience.position || ""} onChange={(e) => updateExperience(index, "position", e.target.value)} type="text" placeholder='Job Title' className='px-3 py-2 text-sm rounded-lg' />
                                <input value={experience.start_date || ""} onChange={(e) => updateExperience(index, "start_date", e.target.value)} type="month" className='px-3 py-2 text-sm rounded-lg' />
                                <input value={experience.end_date || ""} onChange={(e) => updateExperience(index, "end_date", e.target.value)} type="month" disabled={experience.is_current} className='px-3 py-2 text-sm rounded-lg disabled:bg-gray-100 dark:disabled:bg-slate-800' />
                            </div>
                            <label className='flex items-center gap-2'>
                                <input type="checkbox" checked={experience.is_current || false} onChange={(e) => { updateExperience(index, "is_current", e.target.checked ? true : false); }} className='rounded border-gray-300 text-blue-600 focus:ring-blue-500' />
                                <span className='text-sm text-gray-700 dark:text-slate-300'>Currently working here</span>
                            </label>
                            <div className='space-y-2'>
                                <div className='flex items-center justify-between'>
                                    <label className='text-sm font-medium text-gray-700 dark:text-slate-300'>Job Description</label>
                                    <button 
                                        onClick={() => handleAIEnhance(index)} 
                                        disabled={enhancingIndex === index}
                                        className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 rounded hover:bg-purple-200 dark:hover:bg-purple-900/60 transition-colors disabled:opacity-50'
                                    >
                                        {enhancingIndex === index ? <Loader2 className='w-3 h-4 animate-spin' /> : <Sparkles className='w-3 h-4' />}
                                        {enhancingIndex === index ? "Enhancing..." : "Enhance with AI"}
                                    </button>
                                </div>
                                <textarea value={experience.description || ""} onChange={(e) => updateExperience(index, "description", e.target.value)} rows={4} className='w-full text-sm px-3 rounded-lg resize-none border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white p-2 outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-1 transition-colors' placeholder='Describe your key responsibilities and achievements...' />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ExperienceForm