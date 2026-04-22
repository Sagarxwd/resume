import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import ResumePreview from '../components/ResumePreview'
import { ArrowLeftIcon } from 'lucide-react'
import api from '../configs/api'

const Preview = () => {
  const { resumeId } = useParams()

  const [isLoading, setIsLoading] = useState(true)

  const [resumeData, setResumeData] = useState(null)

  const loadResume = async () => {
    try {
      const { data } = await api.get('/api/resumes/public/' + resumeId);
      if (data.resume) {
        setResumeData(data.resume);
        document.title = data.resume.title ? `${data.resume.title} - Resume` : 'NovaResume Document';
      }
    } catch (error) {
      console.log('Error loading resume:', error);
      setResumeData(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadResume()
  }, [])

  return resumeData ? (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="overflow-x-auto overflow-y-visible pb-4 w-full shadow-lg rounded-sm sm:shadow-none sm:rounded-none">
          <ResumePreview
            data={resumeData}
            template={resumeData.template}
            accentColor={resumeData.accent_color}
            classes="py-4 bg-white"
          />
        </div>
      </div>
    </div>
  ) : (
    <div>
      {isLoading ? <Loader /> : (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-center text-6xl text-slate-400 font-medium">
            Resume not found
          </p>

          <a
            href="/"
            className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors"
          >
            <ArrowLeftIcon className="mr-2 size-4" />
            go to home page
          </a>
        </div>
      )}

    </div>


  )
}

export default Preview