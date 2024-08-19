"use client";

import { useRouter } from "next/navigation";
import React from "react";

type DeleteButtonProps = {
  id: string;
};

const deleteTodo = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/todo/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();

  return data.todo;
};

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteTodo(id);
    router.push("/todos");
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-slate-50 p-2 hover:bg-red-300 hover:text-gray-900 transition-all duration-100"
    >
      削除
    </button>
  );
};

export default DeleteButton;
