import { NextResponse } from "next/server";
import { main } from "../route";
import prisma from "@/app/lib/prisma";

export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id: string = req.url.split("/todo/")[1];

    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    return NextResponse.json({ message: "Success", todo }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id: string = req.url.split("/todo/")[1];

    await main();
    const todo = await prisma.todo.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Success", todo }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const id: string = req.url.split("/todo/")[1];

    const { title, content } = await req.json();
    await main();
    const todo = await prisma.todo.update({
      data: { title, content },
      where: { id },
    });
    return NextResponse.json({ message: "Success", todo }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
