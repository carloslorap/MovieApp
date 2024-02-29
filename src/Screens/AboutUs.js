import React from 'react'
import Layout from '../Layout/Layout'
import Head from '../Components/Head'
function AboutUs() {
  return (
    <Layout>
      <div className='min-height-screen container mx-auto px-2 my-6'>
          <Head title="About Us"/>
          <div className='xl:py-20 py-10 px-4'> 
            <div className='grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center'>
              <div>
                <h3 className='text-xl lg:text-3xl mb-4 font-semibold'>
                  Welcome to our Fill-Planet 
                </h3>
                <div className='mt-3 text-sm leading-8 text-text'>
                <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt illum commodi non impedit quas aliquam soluta officia dolorum, placeat voluptatum? Id, dolores laborum saepe eveniet dignissimos est reprehenderit dolor.
                </p>
                <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi sunt illum commodi non impedit quas aliquam soluta officia dolorum, placeat voluptatum? Id, dolores laborum saepe eveniet dignissimos est reprehenderit dolor.
                </p>
              </div>

              <div className='grid md:grid-cols-2 gap-6 mt-8'>
                <div className='p-8 bg-dry rounded-lg'>
                  <span className='text-3xl block font-extrabold '>
                    10K
                  </span>
                  <h4 className='text-lg font-semibold my-2'>Listed Movies</h4>
                  <p className='mb-0 text-text leading-7 text-sm'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing 
                  </p>
                </div>
                <div className='p-8 bg-dry rounded-lg'>
                  <span className='text-3xl block font-extrabold '>
                    8K
                  </span>
                  <h4 className='text-lg font-semibold my-2'>Lovely Users</h4>
                  <p className='mb-0 text-text leading-7 text-sm'>
                  Lorem, ipsum dolor sit amet 
                  </p>
                </div>
              </div>
              </div>
              


              <div className='mt-10 lg:mt-0'>
                <img src='/img-movie/about.jpeg' alt='rg' className='w-full xl:block hidden h-header rounded-lg object-cover'/>
              </div>
            </div>

          </div>  
      </div>
    </Layout>
  )
}

export default AboutUs