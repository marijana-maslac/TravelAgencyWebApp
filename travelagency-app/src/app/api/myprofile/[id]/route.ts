import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/db";
import { getSession, signOut } from "next-auth/react";

interface Props {
  params: { id: string };
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await getSession();
  const userId = parseInt(params.id, 10);

  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await prisma.user.delete({
    where: { id: user.id },
  });

  signOut();

  return NextResponse.json({ message: "User deleted." });
}
