// "use client";

// import React from "react";
// import { useParams } from "next/navigation";

// // Import resort components
// import SaantaraResort from "@/app/components/resorts/saantara/Saantara";
// import DriftersValleyResort from "@/app/components/resorts/driftervalley/Driftervalley";
// import VayaloramResort from "@/app/components/resorts/vayaloram/Vayaloram";
// import AdventureBay from "@/app/components/resorts/adventurebay/AdventureBay";
// import Kailasam from "@/app/components/resorts/kailasam/Kailasam";
// import ResortHome from "@/app/components/resorts/resorthome/Home";

// export default function ResortPage() {
//   const params = useParams();
//   const slug = params.slug as string;

//   return (
//     <div className=" mx-auto  py-12">
//       {slug === "jo-and-sams-villa" && <ResortHome />}
//       {slug === "saantara" && <SaantaraResort />}
//       {slug === "drifters-valley" && <DriftersValleyResort />}
//       {slug === "vayaloram" && <VayaloramResort />}
//       {slug === "adventure-bay" && <AdventureBay />}
//       {slug === "kailasam" && <Kailasam />}

//       {slug !== "jo-and-sams-villa" &&
//         slug !== "saantara" &&
//         slug !== "drifters-valley" &&
//         slug !== "vayaloram" &&
//         slug !== "adventure-bay" &&
//         slug !== "kailasam" && (
//           <div className="text-center">
//             <h1 className="text-2xl font-bold mb-4">Resort not found</h1>
//             <p>The resort &quot;{slug}&quot; could not be found.</p>
//           </div>
//         )}
//     </div>
//   );
// }

"use client";

import React from "react";
import { useParams } from "next/navigation";

// Import resort components
import SaantaraResort from "@/app/components/resorts/saantara/Saantara";
import DriftersValleyResort from "@/app/components/resorts/driftervalley/Driftervalley";
import VayaloramResort from "@/app/components/resorts/vayaloram/Vayaloram";
import AdventureBay from "@/app/components/resorts/adventurebay/AdventureBay";
import Kailasam from "@/app/components/resorts/kailasam/Kailasam";
import ResortHome from "@/app/components/resorts/resorthome/Home";

// Define a type for the component map
type ResortComponentMap = {
  [key: string]: React.ComponentType;
};

// Create a mapping object for cleaner code
const resortComponents: ResortComponentMap = {
  "jo-and-sams-villa": ResortHome, // Matches the slug in data
  saantara: SaantaraResort,
  "drifters-valley": DriftersValleyResort,
  vayaloram: VayaloramResort,
  "adventure-bay": AdventureBay,
  kailasam: Kailasam,
};

export default function ResortPage() {
  const params = useParams();
  const slug = params.slug as string;

  const ResortComponent = resortComponents[slug];

  return (
    <div className="mx-auto py-12">
      {ResortComponent ? (
        <ResortComponent />
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Resort not found</h1>
          <p>The resort &quot;{slug}&quot; could not be found.</p>
        </div>
      )}
    </div>
  );
}
