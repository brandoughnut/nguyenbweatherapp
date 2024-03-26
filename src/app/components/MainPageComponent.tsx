import React from 'react'
import Image from "next/image";

const MainPageComponent = () => {


  return (
    <div>
      <div className='grid grid-cols-12'>
        <div className='col-span-3 bg-[#222F3F] grid justify-center text-white'>
            <div className='mt-[45px]'>
                <input className='h-[95px] w-[450px] text-[40px] rounded-[15px] bg-[#252525] outline-none p-2 border-[4px] border-[#5D5D5D]' placeholder='Search for a city'/>
            </div>
            <div className='my-[35px] text-[30px]'>
                <h1>Favorites</h1>
            </div>
            <div className='bg-[#37588A] cursor-pointer hover:bg-[#5990E2] w-[450px] h-[188px] rounded-[15px] mb-[30px]'>

            </div>
        </div>
        <div className='col-span-9 BG text-white px-[70px]'>
            <div className='grid grid-cols-2'>
                <div>
                    <h1 className='text-[85px]'>Stockton</h1>
                    <p className='text-[30px]'>Monday, November 27, 2023</p>
                </div>
                <div>
                    <div>
                        <h1 className='text-[330px]'>61°<span className='text-[180px]'>F</span></h1>
                    </div>
                    <div className='grid grid-cols-2 text-[80px]'>
                        <div className='text-center'>
                            <h1>H:62°</h1>
                        </div>
                        <div className='text-center'>
                            <h1>L:34°</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-[35px]'>
                <hr/>
            </div>
            <div className='grid grid-cols-5 text-center'>
                <div>
                    <h1 className='text-[40px]'>Today</h1>
                    <div>

                    </div>
                    <p className='text-[30px]'>Clear</p>
                    <h1 className='text-[50px]'>62°</h1>
                    <h1 className='text-[50px]'>34°</h1>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default MainPageComponent
