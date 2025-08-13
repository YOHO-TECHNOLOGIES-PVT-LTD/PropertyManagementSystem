import React from "react";
import { FONTS } from "../../constants/ui constants";

interface Card2Props {
  bgImage: string;
  icon: React.ReactNode;
  title: string;
  subText: string;
  value: number | string;
  iconBg?: string; 
  iconTextColor?: string; 
}

const Card2: React.FC<Card2Props> = ({
  bgImage,
  icon,
  title,
  subText,
  value,
  iconBg = "bg-transparent",
  iconTextColor = "text-black",
}) => {
  return (
   <div
  className="bg-right bg-cover bg-no-repeat p-4 rounded-lg w-[407px] shadow-lg h-[127px] flex flex-col justify-between"
  style={{ backgroundImage: `url(${bgImage})` }}
>

      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div
  className={`h-10 w-10 flex items-center justify-center rounded-full bg-transparent`}
  style={{ backgroundColor: "transparent" }} // extra safeguard
>
  <div className={iconTextColor}>{icon}</div>
</div>

          <p className="font-medium text-gray-800 text-xl">{title}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">{subText}</p>
        </div>
      </div>

      <div className="flex text-2xl font-bold text-gray-800" >
        {value}
      </div>
    </div>
  );
};

export default Card2;