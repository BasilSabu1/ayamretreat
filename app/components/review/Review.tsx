// components/Testimonials.tsx
"use client";
import { useState } from "react";
import Image from "next/image";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  comment: string;
  rating: number;
  avatar: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Viezh Robert",
      location: "Warsaw, Poland",
      comment:
        '"Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best".',
      rating: 4.5,
      avatar: "/review/review1.png",
    },
    {
      id: 2,
      name: "Yessica Christy",
      location: "Shanxi, China",
      comment:
        '"I like it because I like to travel far and still can connect with high speed".',
      rating: 4.5,
      avatar: "/review/review2.png",
    },
    {
      id: 3,
      name: "Kim Young Jou",
      location: "Seoul, South Korea",
      comment:
        '"This is very unusual for my business that currently requires a virtual private network that has high security".',
      rating: 4.5,
      avatar: "/review/review3.png",
    },
    // More testimonials can be added here
    {
      id: 4,
      name: "John Smith",
      location: "New York, USA",
      comment:
        '"The service has been reliable and secure. Exactly what I needed for my work."',
      rating: 4.5,
      avatar: "/review/review3.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleTestimonials =
    currentIndex === 0
      ? testimonials.slice(0, 3)
      : testimonials.slice(currentIndex, currentIndex + 3);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= testimonials.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 3 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Love notification icons */}
        <div className="absolute top-0   left-0 md:left-8 lg:left-12">
          <Image
            src="/review/loveleft.png"
            alt="Like notification"
            width={120}
            height={120}
            className="w-20 md:w-28"
          />
        </div>

        <div className="absolute top-16 right-4 md:right-8 lg:right-12">
          <Image
            src="/review/loveiconright.png"
            alt="Like notification"
            width={120}
            height={120}
            className="w-20 md:w-28"
          />
        </div>

        {/* Testimonial header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
            Testimonials
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Trusted by Thousands of <br />
            Happy Customer
          </h3>
          <p className="text-gray-600 max-w-lg mx-auto">
            These are the stories of our customers who have joined us with great
            pleasure when using this crazy feature.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {visibleTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg border border-gray-200 transition-all duration-300 hover:border-gray-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-gray-200 flex-shrink-0">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 font-semibold">
                    {testimonial.rating}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-700">{testimonial.comment}</p>
            </div>
          ))}
        </div>

        {/* Pagination and Navigation */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {[...Array(4)].map((_, index) => (
              <button
                key={index}
                className={`h-3 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-blue-500" : "w-3 bg-gray-300"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-blue-500 flex items-center justify-center text-blue-500 hover:bg-blue-50 transition-colors"
              aria-label="Previous testimonials"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
              aria-label="Next testimonials"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
