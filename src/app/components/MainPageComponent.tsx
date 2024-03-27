import React from 'react'
import Image from "next/image";
import favorite from '@/assets/weatherfavorite.png';
import unfavorite from '@/assets/weatherunfavorite.png';
import weathersun from '@/assets/weathersun.png';
import weathersearch from '@/assets/weathersearch.png';

const MainPageComponent = () => {


  return (
    <div>
      <div className='grid grid-cols-12'>
        <div className='col-span-3 bg-[#222F3F] grid justify-center text-white'>
            <div className='mt-[45px]'>
                <div className='flex relative'>
                    <input className='h-[95px] w-[450px] text-[40px] rounded-[15px] bg-[#252525] outline-none p-2 border-[4px] border-[#5D5D5D] placeholder:text-[#5D5D5D]' placeholder='Search for a city'/>
                    <span className='flex absolute right-6 top-6'>
                        <Image src={weathersearch} alt='search icon'/>
                    </span>
                </div>
                <div className='my-[35px] text-[30px]'>
                    <h1>Favorites</h1>
                </div>
                <div className='bg-[#37588A] cursor-pointer hover:bg-[#5990E2] w-[450px] h-[188px] rounded-[15px] mb-[30px] grid grid-cols-2 px-[20px]'>
                    <div>
                        <h1 className='text-[40px]'>Sacramento</h1>
                        <p className='text-[30px]'>Clear</p>
                    </div>
                    <div>
                        <h1 className='text-[80px] text-end'>53°<span className='text-[50px]'>F</span></h1>
                        <div className='grid grid-cols-2 text-[30px]'>
                            <div className='text-end'>
                                H:62°
                            </div>
                            <div className='ms-2'>
                                L:34°
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
        <div className='col-span-9 BG text-white px-[70px]'>
            <div className='grid grid-cols-2'>
                <div className='mt-10'>
                    <div className='text-[85px]'>Stockton <Image className='h-[74px] w-[74px] ms-4 mb-3 inline-flex cursor-pointer' src={unfavorite} alt='favorite icon'/></div>
                    <p className='text-[30px]'>Monday, November 27, 2023</p>
                    <div className='mt-[41px]'>
                        <div className='text-[80px]'><Image className='inline-flex' src={weathersun} alt='icon for current weather'/> Clear</div>
                    </div>
                </div>
                <div className='mt-[120px]'>
                    <div>
                        <p className='text-[330px] leading-none'>61<span>°</span><span className='text-[180px]'>F</span></p>
                    </div>
                    <div className='grid grid-cols-2 text-[80px] mt-10'>
                        <div className='text-end me-6'>
                            <h1>H:62°</h1>
                        </div>
                        <div className=''>
                            <h1>L:34°</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-[30px]'>
                <hr/>
            </div>
            <div className='grid grid-cols-5 text-center mb-9'>
                <div className='grid justify-center'>
                    <h1 className='text-[40px]'>Today</h1>
                    <div>
                        <Image className='h-[130px] w-[130px]' src={weathersun} alt='5 day forecast weather'/>
                    </div>
                    <p className='text-[30px]'>Clear</p>
                    <h1 className='text-[50px]'>62°</h1>
                    <h1 className='text-[50px]'>34°</h1>
                </div>
                <div className='grid justify-center'>
                    <h1 className='text-[40px]'>Today</h1>
                    <div>
                        <Image className='h-[130px] w-[130px]' src={weathersun} alt='5 day forecast weather'/>
                    </div>
                    <p className='text-[30px]'>Clear</p>
                    <h1 className='text-[50px]'>62°</h1>
                    <h1 className='text-[50px]'>34°</h1>
                </div>
                <div className='grid justify-center'>
                    <h1 className='text-[40px]'>Today</h1>
                    <div>
                        <Image className='h-[130px] w-[130px]' src={weathersun} alt='5 day forecast weather'/>
                    </div>
                    <p className='text-[30px]'>Clear</p>
                    <h1 className='text-[50px]'>62°</h1>
                    <h1 className='text-[50px]'>34°</h1>
                </div>
                <div className='grid justify-center'>
                    <h1 className='text-[40px]'>Today</h1>
                    <div>
                        <Image className='h-[130px] w-[130px]' src={weathersun} alt='5 day forecast weather'/>
                    </div>
                    <p className='text-[30px]'>Clear</p>
                    <h1 className='text-[50px]'>62°</h1>
                    <h1 className='text-[50px]'>34°</h1>
                </div>
                <div className='grid justify-center'>
                    <h1 className='text-[40px]'>Today</h1>
                    <div>
                        <Image className='h-[130px] w-[130px]' src={weathersun} alt='5 day forecast weather'/>
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
