import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    throw new Error("DB接続に失敗しました");
  }
}

//ブログの全記事取得API
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const todos = await prisma.todo.findMany();
    return NextResponse.json({ message: "Success", todos }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

//ブログの投稿API
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, content, userId, statusId, statusName } = await req.json();

    await main();
    const post = await prisma.todo.create({
      data: {
        title,
        content,
        userId,
        statusId,
        statusName,
      },
    });
    return NextResponse.json({ message: "Success", post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
