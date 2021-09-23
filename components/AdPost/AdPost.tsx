import React from "react";
import Image from "next/image";
import test_image from "./image.jpg";

interface AdPostProps {
    title: string;
    province: string;
    city: string;
    price: number;
}

const AdPost: React.FC<AdPostProps> = ({ title, province, city, price }) => {
    return (
        <div
            className="flex cursor-pointer gap-x-5 rounded-lg p-4 shadow-sm overflow-hidden bg-white border-2 border-opacity-0 
                    hover:border-primary-light hover:border-opacity-80 "
        >
            <div className="flex-none w-28 h-28 relative rounded-md overflow-hidden ">
                <Image src={test_image} alt="" layout="fill" objectFit="cover" />
            </div>

            <div className="">
                <h1 className="flex-auto text-lg font-semibold">{title}</h1>
                <div className="text-sm font-semibold text-gray-500">{`${province},${city}`}</div>
                <div className="text-md font-semibold text-primary">{price} Rs</div>
            </div>
        </div>
    );
};

export default AdPost;
