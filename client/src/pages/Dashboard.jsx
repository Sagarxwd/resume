import { PlusIcon, FilePenLineIcon, TrashIcon, PencilIcon, XIcon, Upload, UploadCloud, UploadCloudIcon } from 'lucide-react'
import React, { use, useEffect, useState } from 'react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import api from '../configs/api'
import pdfToText from 'react-pdftotext'

const Dashboard = () => {


  const { user, token } = useSelector(state => state.auth)

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUplaodResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/users/resumes')
      setAllResumes(data.resumes)
    } catch (error) {
      console.log(error.message)
    }
  }

  const createResume = async (event) => {
    try {
      event.preventDefault()
      const { data } = await api.post('/api/resumes/create', { title })
      setAllResumes([...allResumes, data.resume])
      setTitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const uploadResume = async (event) => {
    event.preventDefault();

    if (!resume) {
      return toast.error("Please select a resume file")
    }

    setIsLoading(true)
    const toastId = toast.loading("Parsing resume...")

    try {
      const text = await pdfToText(resume)
      toast.loading("AI is extracting data...", { id: toastId })

      const { data } = await api.post('/api/ai/upload-resume', {
        resumeText: text,
        title: title
      })

      toast.success("Resume uploaded successfully", { id: toastId })
      navigate(`/app/builder/${data.resumeId}`)

    } catch (error) {
      console.error(error)
      toast.error(error?.response?.data?.message || "Failed to upload resume", { id: toastId })
    } finally {
      setIsLoading(false)
    }
  }

  const editTitle = async (event) => {
    event.preventDefault();
    try {
      const resumeToUpdate = allResumes.find(r => r._id === editResumeId);
      const updatedData = { ...resumeToUpdate, title: title };
      
      const formData = new FormData();
      formData.append('resumeId', editResumeId);
      formData.append('resumeData', JSON.stringify(updatedData));
      
      const { data } = await api.put('/api/resumes/update', formData);
      
      setAllResumes(prev => prev.map(r => r._id === editResumeId ? data.resume : r));
      toast.success('Title updated successfully');
      setEditResumeId('');
      setTitle('');
    } catch (error) {
       toast.error(error?.response?.data?.message || 'Failed to update title');
    }
  }

  const deletResume = async (resumeId) => {
    const confirm = window.confirm("Are you sure you want to delete this resume?");
    if (confirm) {
      try {
        await api.delete(`/api/resumes/delete/${resumeId}`);
        setAllResumes(prev => prev.filter(resume => resume._id !== resumeId));
        toast.success("Resume deleted successfully");
      } catch(error) {
        toast.error(error?.response?.data?.message || "Failed to delete resume");
      }
    }
  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  return (
    <div className="min-h-screen dark:bg-slate-950 transition-colors duration-300 pb-20">
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent sm:hidden'>
          Welcome, {user?.name || 'Guest'}
        </p>

        <div className='flex gap-4'>
          <button onClick={() => setShowCreateResume(true)} className='w-full bg-white dark:bg-slate-900 sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 dark:text-slate-300 border border-dashed border-slate-300 dark:border-slate-800 group hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer'>
            <PlusIcon className='size-11 p-2.5 bg-gradient-to-r from-indigo-300 to-indigo-500 text-white rounded-full group-hover:scale-110 transition-transform duration-300' />
            <p className='text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all font-medium'>Create Resume</p>
          </button>

          <button onClick={() => setShowUploadResume(true)} className='w-full bg-white dark:bg-slate-900 sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 dark:text-slate-300 border border-dashed border-slate-300 dark:border-slate-800 group hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer'>
            <UploadCloudIcon className='size-11 p-2.5 bg-gradient-to-r from-indigo-300 to-purple-500 text-white rounded-full group-hover:scale-110 transition-transform duration-300' />
            <p className='text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-all font-medium'>Upload Existing</p>
          </button>
        </div>

        <hr className='border-slate-300 dark:border-slate-800 my-6 sm:w-[305px]' />

        <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <button
                key={index} onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border dark:border-slate-800 group hover:shadow-lg dark:shadow-slate-900/50 transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + "40",
                }}
              >
                <FilePenLineIcon
                  className="size-7 group-hover:scale-105 transition-all"
                  style={{ color: baseColor }}
                />

                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>

                <p
                  className="absolute bottom-1 text-[11px] transition-all duration-300 px-2 text-center"
                  style={{ color: baseColor + "90" }}
                >
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                <div onClick={e => e.stopPropagation()} className="absolute top-1 right-1 group-hover:flex items-center hidden">
                  <TrashIcon onClick={() => deletResume(resume._id)} className="size-7 p-1.5 hover:bg-slate-100/50 dark:hover:bg-slate-900/50 rounded transition-colors text-slate-700 dark:text-slate-300" />
                  <PencilIcon onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }} className="size-7 p-1.5 hover:bg-slate-100/50 dark:hover:bg-slate-900/50 rounded transition-colors text-slate-700 dark:text-slate-300" />
                </div>
              </button>
            )
          })}
        </div>

        {showCreateResume && (
          <form onSubmit={createResume} onClick={() => setShowCreateResume(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center transition-all animate-fade-in">
            <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 dark:bg-slate-900 border dark:border-slate-800 shadow-2xl dark:shadow-slate-900/50 rounded-lg p-6 w-full max-w-sm'>
              <h2 className='text-xl text-slate-900 dark:text-white font-bold mb-4'>Create a Resume</h2>

              <input onChange={(e) => setTitle(e.target.value)} value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 outline-none focus:ring-0 mb-4 focus:border-green-600 dark:focus:border-green-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-md transition-colors"
                required
              />

              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Create Resume
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreateResume(false); setTitle('');
                }}
              />
            </div>
          </form>
        )}

        {showUplaodResume && (
          <form onSubmit={uploadResume} onClick={() => setShowUploadResume(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center transition-all animate-fade-in">
            <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 dark:bg-slate-900 border dark:border-slate-800 shadow-2xl dark:shadow-slate-900/50 rounded-lg p-6 w-full max-w-sm'>
              <h2 className='text-xl text-slate-900 dark:text-white font-bold mb-4'>Upload Resume</h2>

              <input onChange={(e) => setTitle(e.target.value)} value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 outline-none focus:ring-0 mb-4 focus:border-green-600 dark:focus:border-green-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-md transition-colors"
                required
              />

              <div>
                <label htmlFor="resume-input" className='block text-sm text-slate-700 dark:text-slate-300'>
                  Select resume file:
                  <div className='flex flex-col items-center justify-center gap-2 border group text-slate-400 dark:text-slate-500 border-slate-400 dark:border-slate-600 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 dark:hover:border-green-400 hover:text-green-700 dark:hover:text-green-400 cursor-pointer transition-colors bg-white dark:bg-slate-800'>
                    {resume ? (
                      <p className='text-green-700 dark:text-green-400'>{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloud className='size-14 stroke-1' />
                        <p>Upload resume</p>
                      </>
                    )}

                  </div>
                </label>
                <input type="file" id='resume-input' accept='.pdf' hidden
                  onChange={(e) => setResume(e.target.files[0])} />
              </div>


              <button disabled={isLoading} className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors disabled:bg-green-400">
                {isLoading ? 'Uploading...' : 'Upload Resume'}
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadResume(false); setTitle('');
                }}
              />
            </div>
          </form>
        )}


        {editResumeId && (
          <form onSubmit={editTitle} onClick={() => setEditResumeId('')} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center transition-all animate-fade-in">
            <div onClick={e => e.stopPropagation()} className='relative bg-slate-50 dark:bg-slate-900 border dark:border-slate-800 shadow-2xl dark:shadow-slate-900/50 rounded-lg p-6 w-full max-w-sm'>
              <h2 className='text-xl text-slate-900 dark:text-white font-bold mb-4'>Edit Resume Title</h2>

              <input onChange={(e) => setTitle(e.target.value)} value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 outline-none focus:ring-0 mb-4 focus:border-green-600 dark:focus:border-green-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-md transition-colors"
                required
              />

              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Update
              </button>

              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setEditResumeId(''); setTitle('');
                }}
              />
            </div>
          </form>
        )}

      </div>
    </div>
  )
}

export default Dashboard
