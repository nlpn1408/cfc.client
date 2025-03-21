import UserProfile from "@/components/Dashboard/UserProfile";
import React from "react";

export default function page({ id }: { id: string }) {
  return (
    <>
      <UserProfile id={id} />
    </>
  );
}
