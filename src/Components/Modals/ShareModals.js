import React from 'react'
import { FaFacebook, FaTelegram, FaTwitter } from 'react-icons/fa'
import { FacebookShareButton, TelegramShareButton, TwitterShareButton } from 'react-share'
import MainModals from './MainModals'

const ShareModals = ({modalOpen, setModalOpen,movie}) => {
    const shareData =[
        {
            icon:FaFacebook,
            shareButton:FacebookShareButton,
            
        },
        {
            icon:FaTwitter,
            shareButton:TwitterShareButton,
            
        },
        {
            icon:FaTelegram,
            shareButton:TelegramShareButton,
            
        },
      

    ]

    const url =`${window.location.protocol}//${window.location.host}/movie/${movie._id}`
  return (
    <MainModals modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className='inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle bg-main text-white p-10 overflow-y-auto h-full rounded-2xl'>
                <h2 className='text-2xl '>Share <span className='text-xl font-bold'>{movie?.name}</span> </h2>
                <form className='flex-rows flex-wrap gap-6 mt-6'>
            {
                shareData.map((data,index)=>(
                    <data.shareButton key={index} url={url} quote='hola Mundo de Peliculas'>
                        <div className='w-12 transitions hover:bg-subMain flex-colo text-lg h-12 bg-white rounded bg-opacity-30'>
                            <data.icon/>
                        </div>
                    </data.shareButton>
                ))
            }

                </form>
            </div>

    </MainModals>
  )
}

export default ShareModals