"use client";

import React from "react";
import Image from "next/image";
const FavoriteCardComponent = (prop: {city:string, forecast:string, temp:number, high:number, low:number}) => {
  return (
    <div>
      <div className="bg-[#37588A] cursor-pointer hover:bg-[#5990E2] w-full h-[150px] 2xl:h-[188px] rounded-[15px] mb-[30px] grid grid-cols-7 px-[15px] 2xl:px-[20px] text-white">
      <div className="robotoRegular grid col-span-4 my-5">
        <h1 className="text-[25px] 2xl:text-[40px] truncate">{prop.city}</h1>
        <p className="text-[16px] 2xl:text-[30px] mt-auto">{prop.forecast}</p>
      </div>
      <div className="robotoLight grid col-span-3 mt-7 mb-5">
        <h1 className="text-[50px] 2xl:text-[80px] text-end leading-none">
          {`${prop.temp}°`}<span className="text-[30px] 2xl:text-[50px]">F</span>
        </h1>
        <div className="text-[16px] 2xl:text-[30px] mt-auto">
          <div className="text-end">
            {`H:${prop.high}°`}
            <span className="ms-1">{`L:${prop.low}°`}</span>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default FavoriteCardComponent;
