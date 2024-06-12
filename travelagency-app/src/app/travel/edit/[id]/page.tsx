import React from "react";
import EditTravelForm from "@/components/EditTravelForm";

interface Props {
  params: { id: string };
}

const EditTravelPage = ({ params }: Props) => {
  const tripId = parseInt(params.id, 10);
  if (isNaN(tripId)) {
    return <div>Invalid trip ID</div>;
  }

  return <EditTravelForm tripId={tripId} />;
};

export default EditTravelPage;
