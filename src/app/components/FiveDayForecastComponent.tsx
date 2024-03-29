"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";

const FiveDayForecastComponent = (prop: {date:string, icon:StaticImageData, forecast:string, high:number, low:number}) => {
  return (
    <div className="grid grid-cols-5 xl:grid-cols-1 justify-center">
      <h1 className="text-[20px] md:text-[40px] my-auto robotoMedium">{prop.date}</h1>
      <div className="grid justify-center">
        <Image
          className="h-[45px] w-[45px] md:h-[70px] md:w-[70px] xl:h-[130px] xl:w-[130px] my-[20px]"
          src={prop.icon}
          alt="5 day forecast weather"
        />
      </div>
      <p className="text-[16px] md:text-[30px] my-auto robotoLight">{prop.forecast}</p>
      <h1 className="text-[25px] md:text-[50px] my-auto xl:mt-[16px] robotoBold xl:ms-3">{`${prop.high}°`}</h1>
      <h1 className="text-[25px] md:text-[50px] my-auto robotoThin xl:ms-3">{`${prop.low}°`}</h1>
    </div>
  );
};

export default FiveDayForecastComponent;
