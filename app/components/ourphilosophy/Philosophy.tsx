import React from 'react';

export default function PhilosophySection() {
  return (
    <div 
      className="w-full bg-cover bg-center py-16 relative" 
      style={{ 
        backgroundImage: 'url("/ourphilosophy.png")',
        minHeight: '100vh'
      }}
    >
      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Philosophy Box */}
        <div className="bg-white p-8 mb-20 max-w-2xl mx-auto shadow-md">
          <h2 className="text-gray-700 text-center mb-4 text-lg font-medium">Our Philosophy</h2>
          
          <h1 className="text-3xl md:text-4xl font-serif italic text-center mb-6">Travel Slow. Savour Mountains.</h1>
          
          <p className="text-gray-700 text-sm leading-relaxed">
            We believe in slow travel, in savoring the silence of the mountains
            and the rhythm of the backwaters. We believe that luxury lies in 
            authenticity — in conversations by firelight, in food made from
            memory, in spaces designed with purpose. Every retreat is
            intentionally built to reflect the soul of its location and the spirit of
            its people.
          </p>
        </div>

        {/* Empty space to show hikers in the background image */}
        <div className="w-full h-64 md:h-96"></div>

        {/* What Makes Us Different section */}
        <div className="bg-white p-8 shadow-md">
          <h2 className="text-gray-700 text-center mb-10 text-xl font-medium">What Makes Us Different?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-gray-800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 21V7M7 7L4 10M7 7L10 10M17 21V7M17 7L14 10M17 7L20 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-medium mb-2">Distinctive Retreats</h3>
              <p className="text-xs text-gray-600 px-4">
                Five handpicked locations, each designed around a unique theme 
                and blend — from the mystic paths of Kalevian to the vibrant 
                coastlines of Adventure Bay.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-gray-800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 5C15 6.65685 13.6569 8 12 8C10.3431 8 9 6.65685 9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19C9 17.3431 10.3431 16 12 16C13.6569 16 15 17.3431 15 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 12C6.65685 12 8 10.6569 8 9C8 7.34315 6.65685 6 5 6C3.34315 6 2 7.34315 2 9C2 10.6569 3.34315 12 5 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 12C20.6569 12 22 10.6569 22 9C22 7.34315 20.6569 6 19 6C17.3431 6 16 7.34315 16 9C16 10.6569 17.3431 12 19 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-medium mb-2">Rooted in Culture</h3>
              <p className="text-xs text-gray-600 px-4">
                We work closely with local communities to preserve and 
                share indigenous knowledge, culture, and crafts.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-gray-800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 11L11 14L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-medium mb-2">Sustainably Designed</h3>
              <p className="text-xs text-gray-600 px-4">
                Built with nature, not against it — every structure and system is 
                designed to minimize footprint and maximize harmony.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}