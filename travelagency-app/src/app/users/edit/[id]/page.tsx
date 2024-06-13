import React from "react";
import EditUserForm from "@/components/EditUserForm";

interface Props {
  params: { id: string };
}

const EditUserPage = ({ params }: Props) => {
  const userId = parseInt(params.id, 10);
  if (isNaN(userId)) {
    return <div>Invalid user ID</div>;
  }

  return <EditUserForm userId={userId} />;
};

export default EditUserPage;
