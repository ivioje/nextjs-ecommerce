'use client';
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const Banner = () => {
  const { router } = useAppContext()

  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:pl-20 py-14 md:py-0 bg-[#E6E9F2] my-16 rounded-xl overflow-hidden">
      <Image
        className="max-w-56"
        src={assets.outfit_1}
        alt="jbl_soundbox_image"
      />
      <div className="flex flex-col items-center justify-center text-center space-y-2 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-semibold max-w-[290px]">
        Unleash Your Signature Style
        </h2>
        
        <p className="max-w-[343px] font-medium text-gray-800/60">
        From streetwear to chic — redefine your wardrobe with standout pieces that speak your vibe!
        </p>
        <button onClick={() => router.push('/all-products')} className="group flex items-center justify-center gap-1 px-12 py-2.5 bg-gray-600 rounded text-white">
          Buy now
          <Image className="group-hover:translate-x-1 transition" src={assets.arrow_icon_white} alt="arrow_icon_white" />
        </button>
      </div>
      <Image
        className="hidden md:block max-w-80"
        src={assets.hero1}
        alt="md_controller_image"
      />
      <Image
        className="md:hidden"
        src={assets.outfit_2}
        alt="sm_controller_image"
      />
    </div>
  );
};

export default Banner;