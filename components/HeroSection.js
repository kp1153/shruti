"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 10;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white p-6">
      <div className="max-w-full mx-auto">
        {/* Image Slider */}
        <div className="relative w-full h-[70vh] mb-6 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
          {[...Array(totalSlides)].map((_, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={`/images/${index + 1}.jpeg`}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
          >
            →
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Personal Background */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              व्यक्तिगत परिचय
            </h2>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                <span className="font-medium">जन्म:</span> 2 जनवरी 1974, वाराणसी
              </p>
              <p>
                <span className="font-medium">शिक्षा:</span> बसंत कन्या विद्यालय
                (इंटरमीडिएट), उदय प्रताप कॉलेज (स्नातक)
              </p>
              <p>
                <span className="font-medium">विशेषता:</span> सामाजिक न्याय एवं
                मानवाधिकार संरक्षण में समर्पित जीवन
              </p>
            </div>
          </div>

          {/* Organizational Roles */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              संस्थागत भूमिकाएं
            </h2>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <div>
                <p className="font-medium text-gray-900">PVCHR (1996)</p>
                <p className="text-xs text-gray-600">
                  सह-संस्थापक, मानवाधिकार संरक्षण
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  जन मित्र न्यास (1999)
                </p>
                <p className="text-xs text-gray-600">
                  संस्थापक एवं प्रबंध न्यासी
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  सवित्रा बाई फुले महिला मंच
                </p>
                <p className="text-xs text-gray-600">
                  महिला अधिकार संरक्षण हेतु
                </p>
              </div>
            </div>
          </div>

          {/* Key Impact */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              सामाजिक योगदान
            </h2>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <div>
                <p className="font-medium text-gray-900">न्यायिक हस्तक्षेप</p>
                <p className="text-xs text-gray-600">
                  11 वर्षों में लगभग 3500 मामलों में सक्रिय भूमिका
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-900">सकारात्मक परिणाम</p>
                <p className="text-xs text-gray-600">
                  200+ मामलों में न्याय दिलाने में सफलता
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-900">कार्य क्षेत्र</p>
                <p className="text-xs text-gray-600">
                  दलित अधिकार, महिला सुरक्षा, सामुदायिक न्याय
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-center">
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              प्रमुख उपलब्धियां
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div>
                <p className="font-medium">शीला देवी मामला (2003)</p>
                <p className="text-xs">चिकित्सा लापरवाही पर NHRC हस्तक्षेप</p>
              </div>
              <div>
                <p className="font-medium">बागवानाला केस (2002)</p>
                <p className="text-xs">अवैध कैसीनो बंद कराया</p>
              </div>
              <div>
                <p className="font-medium">मुसहर बच्चों का न्याय</p>
                <p className="text-xs">उच्च न्यायालय द्वारा स्वतः संज्ञान</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
