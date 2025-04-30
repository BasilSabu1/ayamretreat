"use client";

import React from "react";
import { useParams } from "next/navigation";

// Import resort components
import SaantaraResort from "@/app/components/resorts/saantara/Saantara";
import DriftersValleyResort from "@/app/components/resorts/driftervalley/Driftervalley";
import VayaloramResort from "@/app/components/resorts/vayaloram/Vayaloram";
import AdventureBay from "@/app/components/resorts/adventurebay/AdventureBay";
import Kailasam from "@/app/components/resorts/kailasam/Kailasam";

export default function ResortPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Render component based on slug
  return (
    <div className=" mx-auto  py-12">
      {slug === "saantara" && <SaantaraResort />}
      {slug === "drifters-valley" && <DriftersValleyResort />}
      {slug === "vayaloram" && <VayaloramResort />}
      {slug === "adventure-bay" && <AdventureBay />}
      {slug === "kailasam" && <Kailasam />}

      {/* Fallback if no matching resort */}
      {slug !== "saantara" &&
        slug !== "drifters-valley" &&
        slug !== "vayaloram" &&
        slug !== "adventure-bay" &&
        slug !== "kailasam" &&

         (
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Resort not found</h1>
            <p>The resort "{slug}" could not be found.</p>
          </div>
        )}
    </div>
  );
}
