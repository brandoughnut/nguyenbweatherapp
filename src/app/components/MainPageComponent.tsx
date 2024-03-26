import React from 'react'
import Image from "next/image";
import background from '@/assets/weatherbg.png';

const MainPageComponent = () => {


  return (
    <div>
      <div className='grid grid-cols-12'>
        <div className='col-span-3 bg-[#222F3F]'>
            <div className='text-center'>
                <input/>
            </div>
        </div>
        <div className={`col-span-9 bg-[url(${background})]`}>yo °</div>
      </div>
    </div>
  )
}

export default MainPageComponent
