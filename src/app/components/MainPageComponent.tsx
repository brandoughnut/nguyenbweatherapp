'use client';

import React, { useEffect, useState } from 'react'
import Image from "next/image";
import favorite from '@/assets/weatherfavorite.png';
import unfavorite from '@/assets/weatherunfavorite.png';
import weathersearch from '@/assets/weathersearch.png';
import weathersun from '@/assets/weathersun.png';
import weathercloud from '@/assets/weathercloud.png';
import weatherhaze from '@/assets/weatherhaze.png';
import weatherpartcloud from '@/assets/weatherpartcloud.png';
import weatherrain from '@/assets/weatherrain.png';
import weathersnow from '@/assets/weathersnow.png';
import weatherstorm from '@/assets/weatherstorm.png';
import { getCurrentWeather, getCurrentWeatherName, getFiveDayForecast, searchWeather } from '@/utils/DataServices';

const MainPageComponent = () => {

    const [reRender, setReRender] = useState<boolean>(true);
    const [input, setInput] = useState<string>("");
    const [savedInput, setSavedInput] = useState<string>("");
    const [currentLocation, setCurrentLocation] = useState<string>("Stockton, CA");
    const [currentTemp, setCurrentTemp] = useState<number>(61);
    const [currentHigh, setCurrentHigh] = useState<number>(62);
    const [currentLow, setCurrentLow] = useState<number>(34);
    const [currentForecast, setCurrentForecast] = useState<string>("clear sky");
    const [currentIcon, setCurrentIcon] = useState<any>(weathersun);


    useEffect(() => {
        if(input === ""){
            navigator.geolocation.getCurrentPosition(success, errorFunc);
        }else{
            const currentWeatherInfo = async () => {
                const data1 = await searchWeather(savedInput);
                const data2 = await getCurrentWeather(data1[0].lat, data1[0].lon);
                setCurrentForecast(data2.weather[0].description);
                setCurrentLocation(data1[0].name);
                setCurrentTemp(Math.round(data2.main.temp));
                setCurrentHigh(Math.round(data2.main.temp_max));
                setCurrentLow(Math.round(data2.main.temp_min));
                weatherConditions(data2.weather[0].description, data2.weather[0].main);
                stateNames(data1[0].name, data1[0].state, data1[0].country);
            }
            currentWeatherInfo();
        }
        setInput("");
    }, [reRender])

    const success = async(position:any) => {
        console.log(position);
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;

        const data1 = await getCurrentWeatherName(lat, lon);
        const data2 = await getCurrentWeather(lat, lon);
        const data3 = await getFiveDayForecast(lat, lon);
        setCurrentLocation(data1[0].name);
        setCurrentTemp(Math.round(data2.main.temp));
        setCurrentHigh(Math.round(data2.main.temp_max));
        setCurrentLow(Math.round(data2.main.temp_min));
        setCurrentForecast(data2.weather[0].description);
        weatherConditions(data2.weather[0].description, data2.weather[0].main);
        stateNames(data1[0].name, data1[0].state, data1[0].country);
    }   

    const errorFunc = () => {
        alert("Please turn on your location");
    }

    const weatherConditions = (weatherDescription:string, weatherMain:string) => {
        if (weatherDescription === "clear sky") {
            setCurrentIcon(weathersun);
          } else if (weatherDescription === "few clouds") {
            setCurrentIcon(weatherpartcloud);
          } else if (weatherDescription === "scattered clouds" ||
            weatherDescription === "broken clouds" ||
            weatherDescription === "overcast clouds") {
            setCurrentIcon(weathercloud);
          } else if (weatherMain === "Thunderstorm") {
            setCurrentIcon(weatherstorm);
          } else if (
            weatherMain === "Drizzle" ||
            weatherMain === "Rain"
          ) {
            setCurrentIcon(weatherrain);
          } else if (weatherMain === "Snow") {
            setCurrentIcon(weathersnow);
          } else if (
            weatherMain === "Mist" ||
            weatherMain === "Smoke" ||
            weatherMain === "Haze" ||
            weatherMain === "Dust" ||
            weatherMain === "Fog" ||
            weatherMain === "Sand" ||
            weatherMain === "Ash" ||
            weatherMain === "Squall" ||
            weatherMain === "Tornado"
          ) {
            setCurrentIcon(weatherhaze);
          }
    }

    const stateNames = (city:string, state:string, country:string) => {
        switch (state) {
            case "Alabama":
              setCurrentLocation(`${city}, AL`);
              break;
            case "Alaska":
              setCurrentLocation(`${city}, AK`);
              break;
            case "Arizona":
              setCurrentLocation(`${city}, AZ`);
              break;
            case "Arkansas":
              setCurrentLocation(`${city}, AR`);
              break;
            case "California":
              setCurrentLocation(`${city}, CA`);
              break;
            case "Colorado":
              setCurrentLocation(`${city}, CO`);
              break;
            case "Connecticut":
              setCurrentLocation(`${city}, CT`);
              break;
            case "Delaware":
              setCurrentLocation(`${city}, DE`);
              break;
            case "Florida":
              setCurrentLocation(`${city}, FL`);
              break;
            case "Georgia":
              setCurrentLocation(`${city}, GA`);
              break;
            case "Hawaii":
              setCurrentLocation(`${city}, HI`);
              break;
            case "Idaho":
              setCurrentLocation(`${city}, ID`);
              break;
            case "Illinois":
              setCurrentLocation(`${city}, IL`);
              break;
            case "Indiana":
              setCurrentLocation(`${city}, IN`);
              break;
            case "Iowa":
              setCurrentLocation(`${city}, IA`);
              break;
            case "Kansas":
              setCurrentLocation(`${city}, KS`);
              break;
            case "Kentucky":
              setCurrentLocation(`${city}, KY`);
              break;
            case "Louisiana":
              setCurrentLocation(`${city}, LA`);
              break;
            case "Maine":
              setCurrentLocation(`${city}, ME`);
              break;
            case "Maryland":
              setCurrentLocation(`${city}, MD`);
              break;
            case "Massachusetts":
              setCurrentLocation(`${city}, MA`);
              break;
            case "Michigan":
              setCurrentLocation(`${city}, MI`);
              break;
            case "Minnesota":
              setCurrentLocation(`${city}, MN`);
              break;
            case "Mississippi":
              setCurrentLocation(`${city}, MS`);
              break;
            case "Missouri":
              setCurrentLocation(`${city}, MO`);
              break;
            case "Montana":
              setCurrentLocation(`${city}, MT`);
              break;
            case "Nebraska":
              setCurrentLocation(`${city}, NE`);
              break;
            case "Nevada":
              setCurrentLocation(`${city}, NV`);
              break;
            case "New Hampshire":
              setCurrentLocation(`${city}, NH`);
              break;
            case "New Jersey":
              setCurrentLocation(`${city}, NJ`);
              break;
            case "New Mexico":
              setCurrentLocation(`${city}, NM`);
              break;
            case "New York":
              setCurrentLocation(`${city}, NY`);
              break;
            case "North Carolina":
              setCurrentLocation(`${city}, NC`);
              break;
            case "North Dakota":
              setCurrentLocation(`${city}, ND`);
              break;
            case "Ohio":
              setCurrentLocation(`${city}, OH`);
              break;
            case "Oklahoma":
              setCurrentLocation(`${city}, OK`);
              break;
            case "Oregon":
              setCurrentLocation(`${city}, OR`);
              break;
            case "Pennsylvania":
              setCurrentLocation(`${city}, PA`);
              break;
            case "Rhode Island":
              setCurrentLocation(`${city}, RI`);
              break;
            case "South Carolina":
              setCurrentLocation(`${city}, SC`);
              break;
            case "South Dakota":
              setCurrentLocation(`${city}, SD`);
              break;
            case "Tennessee":
              setCurrentLocation(`${city}, TN`);
              break;
            case "Texas":
              setCurrentLocation(`${city}, TX`);
              break;
            case "Utah":
              setCurrentLocation(`${city}, UT`);
              break;
            case "Vermont":
              setCurrentLocation(`${city}, VT`);
              break;
            case "Virginia":
              setCurrentLocation(`${city}, VA`);
              break;
            case "Washington":
              setCurrentLocation(`${city}, WA`);
              break;
            case "West Virginia":
              setCurrentLocation(`${city}, WV`);
              break;
            case "Wisconsin":
              setCurrentLocation(`${city}, WI`);
              break;
            case "Wyoming":
              setCurrentLocation(`${city}, WY`);
              break;
            default:
              setCurrentLocation(`${city}, ${country}`);
              break;
          }
    }

    const reRenderPage = () => {
        setReRender(!reRender);
    }

  return (
    <div>
      <div className='grid grid-cols-12'>
        <div className='col-span-3 bg-[#222F3F] grid justify-center text-white'>
            <div className='mt-[45px]'>
                <div className='flex relative'>
                    <input onChange={(e)=> setInput(e.target.value)} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {if((e as React.KeyboardEvent<HTMLInputElement>).key === "Enter"){
                setInput((e as React.ChangeEvent<HTMLInputElement>).target.value)
                if(input !== ''){
                    setSavedInput(input);
                }
                reRenderPage();
            }}} value={input} className='h-[95px] w-[450px] text-[40px] rounded-[15px] bg-[#252525] outline-none p-2 border-[4px] border-[#5D5D5D] placeholder:text-[#5D5D5D]' placeholder='Search for a city'/>
                    <button onClick={() => {
            if(input !== ''){
                setSavedInput(input);
            }
            reRenderPage();
        }} className='flex absolute right-6 top-6 z-40'>
                        <Image src={weathersearch} alt='search icon'/>
                    </button>
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
                    <div className='text-[85px] whitespace-nowrap'>{currentLocation}<Image className='h-[74px] w-[74px] ms-8 mb-3 inline-flex cursor-pointer' src={unfavorite} alt='favorite icon'/></div>
                    <p className='text-[30px]'>Monday, November 27, 2023</p>
                    <div className='mt-[41px]'>
                        <div className='text-[80px]'><Image className='h-[250px] w-[250px]' src={currentIcon} alt='icon for current weather'/>{currentForecast}</div>
                    </div>
                </div>
                <div className='mt-[155px]'>
                    <div>
                        <p className='text-[330px] leading-none'>{`${currentTemp}°`}<span className='text-[180px]'>F</span></p>
                    </div>
                    <div className='grid grid-cols-2 text-[80px] mt-6'>
                        <div className='text-end me-6'>
                            <h1>{`H:${currentHigh}°`}</h1>
                        </div>
                        <div className=''>
                            <h1>{`L:${currentLow}°`}</h1>
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
