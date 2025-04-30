// app/partner-resorts/page.tsx
'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Types
type Resort = {
  id: string
  name: string
  location: string
  image: string
  state: string
}

// Sample data
const resorts: Resort[] = [
    {
      id: '1',
      name: 'Sunset Palms',
      location: 'Alappuzha, Kerala',
      image: '/images/resort-1.jpg',
      state: 'Kerala'
    },
    {
      id: '2',
      name: 'Ocean Breeze',
      location: 'Varkala, Kerala',
      image: '/images/resort-1.jpg',
      state: 'Kerala'
    },
    {
      id: '3',
      name: 'Saantara',
      location: 'Palakkad',
      image: '/images/saantara.jpg',
      state: 'Kerala'
    },
    {
      id: '4',
      name: 'Drifters Valley',
      location: 'Nedumkandam',
      image: '/images/drifters-valley.jpg',
      state: 'Kerala'
    },
    {
      id: '5',
      name: 'Vayaloram',
      location: 'Kuttanad',
      image: '/images/vayaloram.jpg',
      state: 'Kerala'
    },
    {
      id: '6',
      name: 'Adventure Bay',
      location: 'Marari',
      image: '/images/adventure-bay.jpg',
      state: 'Kerala '
    },
    {
      id: '7',
      name: 'Kailasam',
      location: 'Idukki',
      image: '/images/kailasam.jpg',
      state: 'Kerala'
    },
    {
      id: '8',
      name: 'Beach Paradise',
      location: 'Goa',
      image: '/images/resort-1.jpg',
      state: 'Goa'
    }
  ]

// Get unique states
const states = ['All', ...Array.from(new Set(resorts.map(resort => resort.state)))]

export default function PartnerResorts() {
  const [activeState, setActiveState] = useState('All')
  const router = useRouter()

  const filteredResorts = activeState === 'All' 
    ? resorts 
    : resorts.filter(resort => resort.state === activeState)

  const handleKnowMore = (resortId: string, resortName: string) => {
    // Create URL-friendly slug
    const slug = resortName.toLowerCase().replace(/\s+/g, '-')
    router.push(`/resorts/${slug}?id=${resortId}`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Browse Partner Resorts</h1>
        <p className="text-gray-700 max-w-3xl mx-auto">
          As part of our exclusive subscription model, members gain access not only to our five signature
          retreats, but also to a curated collection of partner resorts across Kerala and beyond. Each partner
          resort reflects our shared ethos — sustainable hospitality, immersive design, and soulful
          experiences that stay with you long after your journey ends.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Explore our wide network of retreats</h2>
        
        {/* State Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {states.map((state) => (
            <button
              key={state}
              onClick={() => setActiveState(state)}
              className={`rounded-full px-4 py-1 text-sm border ${
                activeState === state
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black border-gray-300 hover:border-black'
              }`}
              aria-pressed={activeState === state}
            >
              {state}
            </button>
          ))}
        </div>

        {/* Resort Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredResorts.map((resort) => (
            <div key={resort.id} className="rounded overflow-hidden shadow-md">
              <div className="relative h-48">
                <Image 
                  src={resort.image} 
                  alt={resort.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{resort.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{resort.location}</p>
                <button
                  onClick={() => handleKnowMore(resort.id, resort.name)}
                  className="bg-black text-white text-xs px-3 py-1 rounded-sm hover:bg-gray-800"
                >
                  Know More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Browse All Link */}
        <div className="text-right mt-4">
          <Link href="/resorts" className="text-black font-medium hover:underline">
            Browse all &gt;
          </Link>
        </div>
      </div>

      {/* Why Subscribe Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Why Subscribe?</h2>
          <p className="text-gray-700">
            Whether you're a frequent traveler, a wellness seeker, or someone who loves sharing soulful
            experiences with others — this is your key to a deeper connection with our world. Our retreats are
            accessible only through subscription, making this your exclusive path in.
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded">
          <h3 className="font-semibold mb-2">One stay free for 2 guests</h3>
          <p className="text-sm text-gray-600 mb-4">Every year for 3 years at any of our Ayatana properties</p>
          
          <h3 className="font-semibold mb-2">2-30% Discount on all stays</h3>
          <p className="text-sm text-gray-600 mb-4">At associated resorts/homestays throughout the entirety of the year</p>
          
          <h3 className="font-semibold mb-2">5 Referral Benefit</h3>
          <p className="text-sm text-gray-600">Get 50% back on your subscription</p>
        </div>
      </div>
    </div>
  )
}