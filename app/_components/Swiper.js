"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Link from "next/link";

const DreamSwiper = ({ user }) => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        className="h-screen"
        onSwiper={setSwiperInstance}
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide>
          <div className="relative h-full flex items-center justify-center">
            <div
              className="absolute inset-0 bg-cover bg-center rounded-lg"
              style={{ backgroundImage: "url(/dream.jpg)" }}
            ></div>
            <div className="relative z-10 text-center p-10 bg-white bg-opacity-60 rounded-lg shadow-lg">
              <h1 className="text-5xl font-semibold text-[#1e3a8a] mb-6">
                Welcome to Your Dream Diary
              </h1>
              <p className="text-[#374151] text-lg mb-10">
                An intuitive space to capture, analyze, and explore your dreams
                for personal growth and self-discovery.
              </p>
              <Link
                href={user ? "/account/dreams" : "/login"}
                className="inline-block px-8 py-4 bg-[#1e3a8a] text-white text-2xl font-bold rounded-lg shadow-lg transform transition-all duration-300 hover:bg-[#1d4ed8] hover:scale-105 hover:shadow-2xl focus:outline-none"
                style={{ color: "white" }}
              >
                {user
                  ? "Unlock Your Dream Journal"
                  : "Begin Your Dream Journey"}
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex h-full min-h-screen">
            <div className="w-1/2 p-12 flex items-center justify-center">
              <div>
                <h1 className="text-5xl font-semibold text-[#1e3a8a] mb-6">
                  Capture Your Dreams
                </h1>
                <p className="text-[#4b5563] text-lg mb-10">
                  Record your dreams in real-time and reflect on their hidden
                  meanings and insights.
                </p>
              </div>
            </div>
            <div className="w-1/2">
              <img
                src="/night.jpg"
                alt="Capture Dreams"
                className="w-full h-[90vh] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex h-full min-h-screen">
            <div className="w-1/2 p-12 flex items-center justify-center">
              <div>
                <h1 className="text-5xl font-semibold text-[#1e3a8a] mb-6">
                  Explore Your Subconscious
                </h1>
                <p className="text-[#4b5563] text-lg mb-10">
                  Dive deeper into the subconscious layers of your dreams to
                  uncover insights about yourself.
                </p>
              </div>
            </div>
            <div className="w-1/2">
              <img
                src="/subconscious.jpg"
                alt="Explore Subconscious"
                className="w-full h-[90vh] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex h-full min-h-screen">
            <div className="w-1/2 p-12 flex items-center justify-center">
              <div>
                <h1 className="text-5xl font-semibold text-[#1e3a8a] mb-6">
                  Discover Patterns
                </h1>
                <p className="text-[#4b5563] text-lg mb-10">
                  Recognize recurring themes and symbols that appear across your
                  dreams for deeper understanding.
                </p>
              </div>
            </div>
            <div className="w-1/2">
              <img
                src="/sleep.jpg"
                alt="Discover Patterns"
                className="w-full h-[90vh] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ${
              activeIndex === index ? "bg-[#1e3a8a]" : "bg-[#A3C4F3]"
            }`}
            onClick={() => swiperInstance?.slideTo(index)}
          ></div>
        ))}
      </div>
    </>
  );
};

export default DreamSwiper;
