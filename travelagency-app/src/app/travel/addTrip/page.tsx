import dynamic from "next/dynamic";
import React from "react";

const TravelForm = dynamic(() => import("@/components/TravelForm"), {
  ssr: false,
});
const AddTrip = () => {
  return <TravelForm />;
};

export default AddTrip;
