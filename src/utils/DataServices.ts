import { ICurrentWeather, ICurrentWeatherName, IFiveDay, IFiveList } from "@/interfaces/interfaces";

const API_KEY = process.env.NEXT_PUBLIC_ANALYTICS_ID;

export const getCurrentWeatherName = async (lat:number, lon:number) => {
    const promise = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
    const data:ICurrentWeatherName[] = await promise.json();
    return data;
}

export const getCurrentWeather = async (lat:number, lon:number) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`);
    const data:ICurrentWeather = await promise.json();
    return data;
}

export const getFiveDayForecast = async (lat:number, lon:number) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`);
    const data:IFiveDay = await promise.json();
    return data;
}

export const searchWeather = async (input:string) => {
    const promise = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${API_KEY}`);
    const data:ICurrentWeatherName[] = await promise.json();
    return data;
}