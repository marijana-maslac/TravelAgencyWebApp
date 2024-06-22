import EditReservationForm from "@/components/EditReservationForm";
import React from "react";

interface Props {
  params: { id: string };
}

const Edit = ({ params }: Props) => {
  const reservationId = parseInt(params.id, 10);
  if (isNaN(reservationId)) {
    return <div>Invalid trip ID</div>;
  }
  return <EditReservationForm reservationId={reservationId} />;
};

export default Edit;
