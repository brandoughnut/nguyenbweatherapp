"use client";

import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import favorite from "@/assets/weatherfavorite.png";
import unfavorite from "@/assets/weatherunfavorite.png";
import weathersearch from "@/assets/weathersearch.png";
import weathersun from "@/assets/weathersun.png";
import weathercloud from "@/assets/weathercloud.png";
import weatherhaze from "@/assets/weatherhaze.png";
import weatherpartcloud from "@/assets/weatherpartcloud.png";
import weatherrain from "@/assets/weatherrain.png";
import weathersnow from "@/assets/weathersnow.png";
import weatherstorm from "@/assets/weatherstorm.png";
import weathernight from "@/assets/weathernight.png";
import weatherpartcloudnight from "@/assets/weatherpartcloudnight.png";
import {
  getCurrentWeather,
  getCurrentWeatherName,
  getFiveDayForecast,
  searchWeather,
} from "@/utils/DataServices";
import FiveDayForecastComponent from "./FiveDayForecastComponent";
import FavoriteCardComponent from "./FavoriteCardComponent";
import {
  getLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "@/utils/localstorage";
import { ICurrentWeather, ICurrentWeatherName, IDate, IDateFive, IFiveDay, IFiveList, IGeoLocation, ITime, IWeatherObject } from "@/interfaces/interfaces";

const MainPageComponent = () => {
  const [reRender, setReRender] = useState<boolean>(true);
  const [favoriteToggle, setFavoriteToggle] = useState<string>("hidden");
  const [localStorageItems, setLocalStorageItems] = useState<string>("");
  const [toggleFavorite, setToggleFavorite] = useState<StaticImageData>(unfavorite);
  const [input, setInput] = useState<string>("");
  const [savedInput, setSavedInput] = useState<string>("");
  const [currentLocation, setCurrentLocation] =
    useState<string>("Stockton, CA");
  const [currentTemp, setCurrentTemp] = useState<number>(61);
  const [currentHigh, setCurrentHigh] = useState<number>(62);
  const [currentLow, setCurrentLow] = useState<number>(34);
  const [currentForecast, setCurrentForecast] = useState<string>("clear sky");
  const [currentIcon, setCurrentIcon] = useState<StaticImageData>(weathersun);
  const [high1, setHigh1] = useState<number>(0);
  const [high2, setHigh2] = useState<number>(0);
  const [high3, setHigh3] = useState<number>(0);
  const [high4, setHigh4] = useState<number>(0);
  const [high5, setHigh5] = useState<number>(0);
  const [low1, setLow1] = useState<number>(0);
  const [low2, setLow2] = useState<number>(0);
  const [low3, setLow3] = useState<number>(0);
  const [low4, setLow4] = useState<number>(0);
  const [low5, setLow5] = useState<number>(0);
  const [icon1, setIcon1] = useState<StaticImageData>(weathersun);
  const [icon2, setIcon2] = useState<StaticImageData>(weathersun);
  const [icon3, setIcon3] = useState<StaticImageData>(weathersun);
  const [icon4, setIcon4] = useState<StaticImageData>(weathersun);
  const [icon5, setIcon5] = useState<StaticImageData>(weathersun);
  const [forecast1, setForeCast1] = useState<string>("Clear");
  const [forecast2, setForeCast2] = useState<string>("Clear");
  const [forecast3, setForeCast3] = useState<string>("Clear");
  const [forecast4, setForeCast4] = useState<string>("Clear");
  const [forecast5, setForeCast5] = useState<string>("Clear");
  const [currentDay, setCurrentDay] = useState<string>(
    "Friday, March 29, 2024"
  );
  const [day2, setDay2] = useState<string>("Tue 3");
  const [day3, setDay3] = useState<string>("Wed 4");
  const [day4, setDay4] = useState<string>("Thu 5");
  const [day5, setDay5] = useState<string>("Fri 6");
  const [background, setBackground] = useState<string>("BG");
  const [favoriteDisplay, setFavoriteDisplay] = useState<IWeatherObject[]>([]);

  useEffect(() => {

    if (savedInput === "") {
      navigator.geolocation.getCurrentPosition(success, errorFunc);
    } else {
      const currentWeatherInfo = async () => {
        const data1 = await searchWeather(savedInput);
        const data2 = await getCurrentWeather(data1[0].lat, data1[0].lon);
        const data3 = await getFiveDayForecast(data1[0].lat, data1[0].lon);
        if (!getLocalStorage().includes(`${data1[0].name}`)) {
          setToggleFavorite(unfavorite);
        } else {
          setToggleFavorite(favorite);
        }
        setLocalStorageItems(data1[0].name);

        const options: ITime = {
          hour: "numeric",
          hour12: false,
        };
        let time = new Intl.DateTimeFormat("en-US", options).format(
          new Date(data2.dt * 1000 + data2.timezone * 1000)
        );

        if (parseInt(time) + 7 > 6 && parseInt(time) + 7 < 21) {
          setBackground("BG");
        } else {
          setBackground("darkBG");
        }
        setCurrentForecast(data2.weather[0].description);
        setCurrentLocation(data1[0].name);
        setCurrentTemp(Math.round(data2.main.temp));
        setCurrentHigh(Math.round(data2.main.temp_max));
        setCurrentLow(Math.round(data2.main.temp_min));
        weatherConditions(
          data2.weather[0].description,
          data2.weather[0].main,
          setCurrentIcon,
          parseInt(time) + 7
        );
        stateNames(data1[0].name, data1[0].state, data1[0].country);
        fiveDay(data3);
        currentTime(data2.dt, data2.timezone);
      };
      currentWeatherInfo();
    }
    const weatherFavorites = async () => {
      let favorites:string[] = getLocalStorage();
      let favArray:IWeatherObject[] = [];
      for(let i = 0; i<favorites.length; i++){
        const promise:ICurrentWeatherName[] = await searchWeather(favorites[i]);
        const data:ICurrentWeather = await getCurrentWeather(promise[0].lat, promise[0].lon);
        let weatherObject:IWeatherObject = {
          name:promise[0].name,
          forecast:data.weather[0].main,
          temp:data.main.temp,
          high:data.main.temp_max,
          low:data.main.temp_min
        }
        favArray.push(weatherObject);
      }
      setFavoriteDisplay(favArray);
      return favoriteDisplay;
    }
    weatherFavorites();
    setInput("");
  }, [reRender]);

  const success = async (position:IGeoLocation) => {
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;
    console.log(`${lon}, ${lat}`);

    const data1 = await getCurrentWeatherName(lat, lon);
    const data2 = await getCurrentWeather(lat, lon);
    const data3 = await getFiveDayForecast(lat, lon);
    if (!getLocalStorage().includes(`${data1[0].name}`)) {
      setToggleFavorite(unfavorite);
    } else {
      setToggleFavorite(favorite);
    }
    setLocalStorageItems(data1[0].name);
    const options: ITime = {
      hour: "numeric",
      hour12: false,
    };
    let time = new Intl.DateTimeFormat("en-US", options).format(
      new Date(data2.dt * 1000 + data2.timezone * 1000)
    );
    if (parseInt(time) + 7 > 6 && parseInt(time) + 7 < 21) {
      setBackground("BG");
    } else {
      setBackground("darkBG");
    }
    setCurrentLocation(data1[0].name);
    setCurrentTemp(Math.round(data2.main.temp));
    setCurrentHigh(Math.round(data2.main.temp_max));
    setCurrentLow(Math.round(data2.main.temp_min));
    setCurrentForecast(data2.weather[0].description);
    weatherConditions(
      data2.weather[0].description,
      data2.weather[0].main,
      setCurrentIcon,
      parseInt(time) + 7
    );
    stateNames(data1[0].name, data1[0].state, data1[0].country);
    fiveDay(data3);
    currentTime(data2.dt, data2.timezone);
  };

  const errorFunc = () => {
    alert("Please turn on your location");
  };

  const handleFavorites = () => {
    if (!getLocalStorage().includes(`${localStorageItems}`)) {
      saveToLocalStorage(localStorageItems);
    } else {
      removeFromLocalStorage(localStorageItems);
    }
  };

  const weatherConditions = (
    weatherDescription: string,
    weatherMain: string,
    icon: React.Dispatch<React.SetStateAction<StaticImageData>>,
    time: number
  ) => {
    if (weatherDescription === "clear sky") {
      if (time > 6 && time < 21) {
        icon(weathersun);
      } else {
        icon(weathernight);
      }
    } else if (weatherDescription === "few clouds") {
      if (time > 6 && time < 21) {
        icon(weatherpartcloud);
      } else {
        icon(weatherpartcloudnight);
      }
    } else if (
      weatherDescription === "scattered clouds" ||
      weatherDescription === "broken clouds" ||
      weatherDescription === "overcast clouds"
    ) {
      icon(weathercloud);
    } else if (weatherMain === "Thunderstorm") {
      icon(weatherstorm);
    } else if (weatherMain === "Drizzle" || weatherMain === "Rain") {
      icon(weatherrain);
    } else if (weatherMain === "Snow") {
      icon(weathersnow);
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
      icon(weatherhaze);
    }
  };

  const stateNames = (city: string, state: string, country: string) => {
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
  };

  const fiveDay = (data: IFiveDay) => {
    const options: ITime = {
      hour: "numeric",
      hour12: false,
    };
    let time = new Intl.DateTimeFormat("en-US", options).format(
      new Date(data.list[0].dt * 1000 + data.city.timezone * 1000)
    );

    let highTemp1: number = 0;
    let highTemp2: number = 0;
    let highTemp3: number = 0;
    let highTemp4: number = 0;
    let highTemp5: number = 0;
    let lowTemp1: number = 5000;
    let lowTemp2: number = 5000;
    let lowTemp3: number = 5000;
    let lowTemp4: number = 5000;
    let lowTemp5: number = 5000;

    weatherConditions(
      data.list[0].weather[0].description,
      data.list[0].weather[0].main,
      setIcon1,
      parseInt(time) + 7
    );
    weatherConditions(
      data.list[8].weather[0].description,
      data.list[8].weather[0].main,
      setIcon2,
      parseInt(time) + 7
    );
    weatherConditions(
      data.list[16].weather[0].description,
      data.list[16].weather[0].main,
      setIcon3,
      parseInt(time) + 7
    );
    weatherConditions(
      data.list[24].weather[0].description,
      data.list[24].weather[0].main,
      setIcon4,
      parseInt(time) + 7
    );
    weatherConditions(
      data.list[32].weather[0].description,
      data.list[32].weather[0].main,
      setIcon5,
      parseInt(time) + 7
    );

    setForeCast1(data.list[0].weather[0].main);
    setForeCast2(data.list[8].weather[0].main);
    setForeCast3(data.list[16].weather[0].main);
    setForeCast4(data.list[24].weather[0].main);
    setForeCast5(data.list[32].weather[0].main);

    fiveDayTime(data.list[8].dt, data.city.timezone, setDay2);
    fiveDayTime(data.list[16].dt, data.city.timezone, setDay3);
    fiveDayTime(data.list[24].dt, data.city.timezone, setDay4);
    fiveDayTime(data.list[32].dt, data.city.timezone, setDay5);

    data.list.slice(0, 8).map((data: IFiveList) => {
      let high = data.main.temp_max;
      let low = data.main.temp_min;
      if (high >= highTemp1) {
        highTemp1 = high;
      }
      if (low <= lowTemp1) {
        lowTemp1 = low;
      }
      setHigh1(Math.round(highTemp1));
      setLow1(Math.round(lowTemp1));
    });

    data.list.slice(8, 16).map((data: IFiveList) => {
      let high = data.main.temp_max;
      let low = data.main.temp_min;
      if (high >= highTemp2) {
        highTemp2 = high;
      }
      if (low <= lowTemp2) {
        lowTemp2 = low;
      }
      setHigh2(Math.round(highTemp2));
      setLow2(Math.round(lowTemp2));
    });

    data.list.slice(16, 24).map((data: IFiveList) => {
      let high = data.main.temp_max;
      let low = data.main.temp_min;
      if (high >= highTemp3) {
        highTemp3 = high;
      }
      if (low <= lowTemp3) {
        lowTemp3 = low;
      }
      setHigh3(Math.round(highTemp3));
      setLow3(Math.round(lowTemp3));
    });

    data.list.slice(24, 32).map((data: IFiveList) => {
      let high = data.main.temp_max;
      let low = data.main.temp_min;
      if (high >= highTemp4) {
        highTemp4 = high;
      }
      if (low <= lowTemp4) {
        lowTemp4 = low;
      }
      setHigh4(Math.round(highTemp4));
      setLow4(Math.round(lowTemp4));
    });

    data.list.slice(32, 40).map((data: IFiveList) => {
      let high = data.main.temp_max;
      let low = data.main.temp_min;
      if (high >= highTemp5) {
        highTemp5 = high;
      }
      if (low <= lowTemp5) {
        lowTemp5 = low;
      }
      setHigh5(Math.round(highTemp5));
      setLow5(Math.round(lowTemp5));
    });
  };

  const handleSidebar = () => {
    if (favoriteToggle === "") {
      setFavoriteToggle("hidden");
    } else {
      setFavoriteToggle("");
    }
  };

  const currentTime = (dateTime: number, timezone: number) => {
    const current: IDate = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    let time = new Intl.DateTimeFormat("en-US", current).format(
      new Date(dateTime * 1000 + timezone * 1000)
    );
    setCurrentDay(time);
  };

  const fiveDayTime = (dateTime: number, timezone: number, day: React.Dispatch<React.SetStateAction<string>>) => {
    const options: IDateFive = {
      weekday: "short",
      day: "numeric",
    };
    let time = new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateTime * 1000 + timezone * 1000)
    );
    day(time);
  };

  const reRenderPage = () => {
    setReRender(!reRender);
  };

  return (
    <div>
      <div className="grid grid-cols-1 2xl:grid-cols-12">
        <div className="col-span-3 bg-[#222F3F] grid justify-center text-white">
          <div className="my-6 2xl:mt-[45px] mx-4">
            <div className="flex relative">
              <input
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(
                  e:
                    | React.KeyboardEvent<HTMLInputElement>
                    | React.ChangeEvent<HTMLInputElement>
                ) => {
                  if (
                    (e as React.KeyboardEvent<HTMLInputElement>).key === "Enter"
                  ) {
                    setInput(
                      (e as React.ChangeEvent<HTMLInputElement>).target.value
                    );
                    if (input !== "") {
                      setSavedInput(input);
                    }
                    reRenderPage();
                  }
                }}
                value={input}
                className="robotoLight ps-4 h-[75px] xl:h-[95px] w-full text-[30px] xl:text-[40px] rounded-l-[15px] bg-[#252525] outline-none p-2 border-y-[4px] border-l-[4px] border-[#5D5D5D] placeholder:text-[#5D5D5D]"
                placeholder="Search for a city"
              />
              <button
                onClick={() => {
                  if (input !== "") {
                    setSavedInput(input);
                  }
                  reRenderPage();
                }}
                className="bg-[#252525] outline-none border-y-[4px] w-[100px] border-r-[4px] border-[#5D5D5D] ps-6 rounded-r-[15px]"
              >
                <Image
                  className="h-8 w-8 xl:h-[50px] xl:w-[50px]"
                  src={weathersearch}
                  alt="search icon"
                />
              </button>
            </div>
            <div className="block 2xl:hidden mt-6">
              <button
                onClick={handleSidebar}
                className="bg-[#37588A] hover:bg-[#5990E2] w-full rounded-[15px] h-[75px] text-[30px] robotoMedium"
              >
                Open Favorites
              </button>
            </div>
            <div className="hidden 2xl:block">
              <div className="my-[35px] text-[30px] robotoMedium ">
                <h1>Favorites</h1>
              </div>
              <div className="overflow-y-auto h-[80vh]">
                {favoriteDisplay.map((data, idx:number) => {
                return(
                  <div key={idx} onClick={() => {
                    setSavedInput(data.name);
                    reRenderPage();
                  }}>
                    <FavoriteCardComponent city={data.name} forecast={data.forecast} temp={Math.round(data.temp)} high={Math.round(data.high)} low={Math.round(data.low)} />
                  </div>
                  )
                })}
              </div>
              
            </div>
          </div>
        </div>
        <div
          className={`col-span-9 ${background} text-white px-[50px] md:px-[70px]`}
        >
          <div className="grid grid-cols-1 xl:grid-cols-2">
            <div className="mt-10 text-center xl:text-start">
              <div className="text-[30px] md:text-[85px] xl:whitespace-nowrap robotoRegular">
                {currentLocation}
                <button onClick={()=> {
                    handleFavorites();
                    reRenderPage();
                  }}>
                  <Image
                  className="h-8 w-8 md:h-[74px] ms-4 xl:ms-8 md:w-[74px]"
                  src={toggleFavorite}
                  alt="favorite icon"
                  />
                </button>
                
              </div>
              <p className="text-[20px] md:text-[30px] robotoRegular">
                {currentDay}
              </p>
              <div className="hidden xl:block mt-3 xl:mt-[41px]">
                <div className="text-[20px] md:text-[70px] robotoRegular truncate">
                  <Image
                    className="h-[125px] w-[125px] md:h-[200px] md:w-[200px] xl:h-[250px] xl:w-[250px] mx-auto xl:mx-0"
                    src={currentIcon}
                    alt="icon for current weather"
                  />
                  {currentForecast}
                </div>
              </div>
            </div>

            <div className="mt-5 xl:mt-[155px]">
              <div>
                <p className="text-[100px] md:text-[200px] xl:text-[330px] leading-none robotoThin text-center xl:text-end">
                  {`${currentTemp}°`}
                  <span className="text-[50px] md:text-[100px] xl:text-[180px]">
                    F
                  </span>
                </p>
              </div>
              <div className="mt-3 xl:mt-[41px] text-center block xl:hidden">
                <div className="text-[20px] md:text-[70px] robotoRegular truncate">
                  {currentForecast}
                </div>
              </div>
              <div className="text-[20px] md:text-[70px] mt-5 robotoLight">
                <div className="text-center">
                  {`H:${currentHigh}°`}
                  <span className="ms-10">{`L:${currentLow}°`}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="my-4 lg:my-[30px]">
            <hr />
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-5 text-center mb-9">
            <FiveDayForecastComponent
              date="Today"
              icon={icon1}
              forecast={forecast1}
              high={high1}
              low={low1}
            />
            <FiveDayForecastComponent
              date={day2}
              icon={icon2}
              forecast={forecast2}
              high={high2}
              low={low2}
            />
            <FiveDayForecastComponent
              date={day3}
              icon={icon3}
              forecast={forecast3}
              high={high3}
              low={low3}
            />
            <FiveDayForecastComponent
              date={day4}
              icon={icon4}
              forecast={forecast4}
              high={high4}
              low={low4}
            />
            <FiveDayForecastComponent
              date={day5}
              icon={icon5}
              forecast={forecast5}
              high={high5}
              low={low5}
            />
          </div>
        </div>
        <div
          className={`${favoriteToggle} transition-transform fixed top-0 left-0 z-40 h-screen p-2 bg-white w-[375px] dark:bg-gray-800`}
        >
          <p className="text-[25px] my-3 robotoMedium text-white">Favorites</p>
          <button
            onClick={handleSidebar}
            type="button"
            data-drawer-hide="drawer-example"
            aria-controls="drawer-example"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-6 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          <div className="overflow-y-auto h-[90vh]">
            {favoriteDisplay.map((data, idx:number) => {
                return(
                  <div key={idx} onClick={() => {
                    setSavedInput(data.name);
                    handleSidebar();
                    reRenderPage();
                  }}>
                    <FavoriteCardComponent city={data.name} forecast={data.forecast} temp={Math.round(data.temp)} high={Math.round(data.high)} low={Math.round(data.low)} />
                  </div>
                )
              })}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default MainPageComponent;
