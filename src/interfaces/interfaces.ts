export interface ICurrentWeatherName {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;
}

export interface ICurrentWeather {
  coord: {
    lon: number;
    lat: number;
  };
  dt: number;
  main: IWeather;
  timezone: number;
  weather: IWeatherCondition[];
}

export interface IWeather {
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface IWeatherCondition {
  description: string;
  main: string;
}

export interface IWeatherObject {
  name: string;
  forecast: string;
  temp: number;
  high: number;
  low: number;
}

export interface IFiveDay {
    city:{
        timezone:number
    }
    list:IFiveList[]
}

export interface IFiveList {
    dt:number
    main:IWeather
    weather:IWeatherCondition[]
}

export interface IGeoLocation {
    coords: {
        latitude:number
        longitude:number
    }
}

export interface ITime {
    hour:'numeric' | '2-digit'
    hour12:true | false
}

export interface IDate {
    weekday: 'narrow' | 'short' | 'long'
    month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long'
    day: 'numeric' | '2-digit'
    year: 'numeric' | '2-digit'
}

export interface IDateFive {
    weekday: 'narrow' | 'short' | 'long'
    day: 'numeric' | '2-digit'
}