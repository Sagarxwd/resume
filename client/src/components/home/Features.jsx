import React from 'react'
import Title from './Title';
import { Zap } from 'lucide-react';

const Features = () => {
    const [isHover, setIsHover] = React.useState(false);
  return (
     <div id='features' className='flex flex-col items-center my-10 scroll-mt-12'>
        
        <div className="flex items-center gap-2 text-sm text-red-800 dark:text-red-400 bg-red-400/10 dark:bg-red-900/40 border dark:border-red-900/50 rounded-full px-6 py-1.5 transition-colors">
          <Zap width={14}/> 
            <span>Simple proccess</span>
        </div>

        <Title title='Build your resume' desciption='Discover the powerful features that make our AI Resume Builder your ultimate career companion.' />

            <div className="flex flex-col md:flex-row items-center xl:-mt-10">
                <img className="max-w-2xl w-full xl:-ml-32" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png" alt="" />
                <div className="px-4 md:px-0" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                    <div className={"flex items-center justify-center gap-6 max-w-md group cursor-pointer"}>
                        <div className={`p-6 group-hover:bg-violet-100 dark:group-hover:bg-violet-900/40 border border-transparent dark:group-hover:border-violet-700 group-hover:border-violet-300 flex gap-4 rounded-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgb(139,92,246,0.12)] ${!isHover ? 'border-violet-300 dark:border-violet-700 bg-violet-100 dark:bg-violet-900/40 shadow-[0_8px_30px_rgb(139,92,246,0.12)] -translate-y-1' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 stroke-violet-600 dark:stroke-violet-400"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" /><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200">AI-Powered Suggestions</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs">Get instant AI-generated bullet points, summaries, and skill recommendations tailored to your target role.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer mt-2 md:mt-0">
                        <div className="p-6 group-hover:bg-green-100 dark:group-hover:bg-green-900/40 border border-transparent group-hover:border-green-300 dark:group-hover:border-green-700 flex gap-4 rounded-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgb(34,197,94,0.12)]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 stroke-green-600 dark:stroke-green-400"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200">ATS-Optimized Templates</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs">Clean, recruiter-approved templates that pass Applicant Tracking Systems and look great in any format.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer mt-2 md:mt-0">
                        <div className="p-6 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/40 border border-transparent group-hover:border-orange-300 dark:group-hover:border-orange-700 flex gap-4 rounded-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgb(249,115,22,0.12)]">
                            <svg className="size-6 stroke-orange-600 dark:stroke-orange-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15V3" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /></svg>
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700 dark:text-slate-200">One-Click PDF Export</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs">Download a pixel-perfect PDF in seconds, ready to send to any employer or upload to job portals.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
        </div>
  )
}

export default Features