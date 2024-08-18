import DeleteButton from "@/app/components/DeleteButton";
import Link from "next/link";
import React from "react";

const getBlogById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/todo/${id}`, {
    method: "GET",
  });
  const data = await res.json();

  return data.todo;
};

const page = async ({ params }: { params: { id: string } }) => {
  const todo = await getBlogById(params.id);

  return (
    <>
      <div className="flex flex-col bg-white pt-5 pb-2 px-4 my-4 shadow-lg">
        <div className="flex items-center border-b-2 pb-2">
          <select className="border p-2 rounded-md">
            <option value="notstarted">未着手</option>
            <option value="progress">進行中</option>
            <option value="done">完了</option>
          </select>
          <p className="ml-3">{todo.title}</p>
        </div>
        <p className="mt-2">{todo.content}</p>
        <small className="text-end pt-2">
          最終更新日時：{new Date(todo.createdAt).toLocaleString()}
        </small>
        <div className="flex justify-center items-center gap-2">
          <Link
            href={`/todos/${todo.id}/edit`}
            className="bg-green-600 text-slate-50 p-2 hover:bg-green-300 hover:text-gray-900 transition-all duration-100"
          >
            編集
          </Link>
          <DeleteButton id={params.id} />
        </div>
      </div>
    </>
  );
};

export default page;
