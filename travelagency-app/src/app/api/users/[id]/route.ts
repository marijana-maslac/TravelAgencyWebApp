import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/db";
import bcrypt from "bcryptjs";
import { userSchema } from "@/validation/userSchema";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    console.error("Validation error: ", validation.error);
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (body?.password && body.password != "") {
    const hashPassword = await bcrypt.hash(body.password, 10);
    body.password = hashPassword;
  } else {
    delete body.password;
  }

  if (user.username !== body.username) {
    const duplicateUsername = await prisma.user.findUnique({
      where: { username: body.username },
    });
    if (duplicateUsername) {
      return NextResponse.json(
        { message: "Duplicate username" },
        { status: 409 }
      );
    }
  }

  const updateUser = await prisma.user.update({
    where: { id: user.id },
    data: { ...body },
  });
  return NextResponse.json(updateUser);
}

export async function DELETE(request: NextRequest, { params }: Props) {
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

  return NextResponse.json({ message: "User deleted." });
}
