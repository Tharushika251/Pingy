import { BadgeCheck, X } from 'lucide-react'
import moment from 'moment/moment';
import React, { useState } from 'react'
import { useEffect } from 'react';

const StoryViewer = ({viewStory, setViewStory}) => {
  
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let timer, progressInterval;

        if (viewStory && viewStory.media_type !== 'video') {
            setProgress(0);

            const duration = 10000;
            const setTime = 100;
            let elapsed = 0;

            progressInterval = setInterval(() => {
                elapsed += setTime;
                setProgress((elapsed / duration) * 100);
            }, setTime);
            //Close story after duration
            timer = setTimeout(() => {
                setViewStory(null);
            }, duration);

            return () => {
                clearTimeout(timer);
                clearInterval(progressInterval);
            }
        }
    }, [viewStory, setViewStory])

    const handleClose = () => {     
        setViewStory(null)
    }

    if(!viewStory) return null;

    const renderContent = () => {
        switch (viewStory.media_type) {
            case 'image':
                return (
                    <img src={viewStory.media_url} alt="" 
                        className='max-w-full max-h-screen object-contain'/>
                );
            case 'video':
                return (
                    <video onEnded={()=>setViewStory(null)} src={viewStory.media_url} className='max-h-screen' controls autoPlay/>
                );
            case 'text':
                return (
                    <div className='w-full h-full flex items-center justify-center p-8 text-white text-2xl text-center'>
                        {viewStory.content}
                    </div>
                );
            default:
                return null;
        }
    }
  
    return (
    <div className='fixed inset-0 h-screen bg-black bg-opacity-90 z-110 flex items-center justify-center' 
        style={{backgroundColor: viewStory.media_type === 'text' ? viewStory.background_Color : '#000000'}}>
        
        {/* Progress Bar */}
        <div className='absolute top-0 left-0 w-full h-1 bg-gray-700' >
            <div className='h-full bg-white transition-all duration-100 linear'
                style={{width: `${progress}%`}}>
            </div>
        </div>
        
            {/* Minimalist User Info */}
            <div className="absolute top-6 left-6 z-10">
                <div className="flex items-center space-x-3 bg-gradient-to-r from-black/60 to-transparent backdrop-blur-lg rounded-full pr-6 pl-3 py-2 border border-white/10">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
                            <img
                                src={viewStory.user?.profile_picture}
                                alt={viewStory.user?.full_name}
                                className="w-full h-full rounded-full object-cover border-2 border-white"
                            />
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                            <span className="text-white font-bold text-base tracking-tight">
                                {viewStory.user?.full_name}
                            </span>
                            {viewStory.user?.is_verified && (
                                <BadgeCheck className="w-5 h-5 text-blue-400" fill="currentColor" />
                            )}
                        </div>
                        <span className="text-white/70 text-xs font-medium">
                            {moment(viewStory.createdAt).fromNow()}
                        </span>
                    </div>
                </div>
            </div>

          {/* Close button */}
          <button onClick={handleClose} className='absolute top-4 right-4 text-white text-3xl font-bold focus-outline-none'>
            <X className='v-8 h-8 hover:scale-110 transition cursor-pointer' />
          </button>

          {/* Content Wrapper */}
          <div className='max-w-[90vw] max-h-[90vh] flex items-center justify-center'>
            {renderContent()}
          </div>

    </div>
  )
}

export default StoryViewer