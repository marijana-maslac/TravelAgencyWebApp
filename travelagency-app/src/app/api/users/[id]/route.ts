import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/db";
import bcrypt from "bcryptjs";
import { userSchema } from "@/validation/userSchema";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  console.log("Request Body:", body);

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

  if (body.password && body.password !== "") {
    const hashPassword = await bcrypt.hash(body.password, 10);
    // console.log(`Hashed Password: ${hashPassword}`);
    body.password = hashPassword;
  } else {
    delete body.password;
  }

  delete body.role;

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
export async function PUT(request: NextRequest, { params }: Props) {
  const userId = parseInt(params.id, 10);
  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const body = await request.json();
  const { username, email } = body;

  try {
    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        email,
      },
    });

    return NextResponse.json(updateUser, { status: 200 });
  } catch (error) {
    console.error("Server error: ", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
export async function GET(request: NextRequest, { params }: Props) {
  const userId = parseInt(params.id, 10);
  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Server error: ", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
