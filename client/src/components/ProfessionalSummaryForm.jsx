import { Sparkles, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import api from '../configs/api'

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
    const [isEnhancing, setIsEnhancing] = useState(false);

    const handleAIEnhance = async () => {
        if (!data || data.trim().length === 0) {
            toast.error("Please enter a basic summary first to enhance.");
            return;
        }

        try {
            setIsEnhancing(true);
            const response = await api.post('/api/ai/enhance-pro-sum', { userContent: data });
            onChange(response.data.enhanceContent);
            toast.success("Summary enhanced successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error enhancing summary.");
        } finally {
            setIsEnhancing(false);
        }
    };

    return (
        <div className='space-y-4'>
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white'>Professional Summary</h3>
                    <p className='text-sm text-gray-500 dark:text-slate-400'>Add summary for your resume here</p>
                </div>
                <button 
                    onClick={handleAIEnhance} 
                    disabled={isEnhancing}
                    className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-400 rounded hover:bg-purple-200 dark:hover:bg-purple-900/60 transition-colors disabled:opacity-50'
                >
                    {isEnhancing ? <Loader2 className='size-4 animate-spin' /> : <Sparkles className='size-4' />}
                    {isEnhancing ? "Enhancing..." : "AI Enhance"}
                </button>
            </div>
            <div className='mt-6'>
                <textarea value={data || ""} onChange={(e) => onChange(e.target.value)} rows={7} className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none' placeholder='Write a compelling professional summary that highlights your key strengths and career objectives...' />
                <p className='text-xs text-gray-500 dark:text-slate-400 max-w-4/5 mx-auto text-center mt-2'>Tip: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.</p>
            </div>
        </div>
    )
}

export default ProfessionalSummaryForm