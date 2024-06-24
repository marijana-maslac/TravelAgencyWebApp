import EditMyProfile from "@/components/EditMyProfile";
import React from "react";

interface Props {
  params: { id: string };
}

const EditUserPage = ({ params }: Props) => {
  const userId = parseInt(params.id, 10);
  if (isNaN(userId)) {
    return <div>Invalid user ID</div>;
  }

  return <EditMyProfile userId={userId} />;
};

export default EditUserPage;
