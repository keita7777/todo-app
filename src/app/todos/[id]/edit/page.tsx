"use client";

import { getStatusName } from "@/app/utils/getStatusName";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

const getBlogById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/todo/${id}`, {
    method: "GET",
  });
  const data = await res.json();

  return data.todo;
};

const editBlog = async (
  title: string | undefined,
  content: string | undefined,
  statusId: string | undefined,
  statusName: string | undefined,
  id: string
) => {
  const res = await fetch(`http://localhost:3000/api/todo/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, content, statusId, statusName, id }),
    headers: {
      "Content-type": "application/json",
    },
  });

  return res.json();
};

const page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const statusRef = useRef<HTMLSelectElement | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    await editBlog(
      titleRef.current?.value,
      contentRef.current?.value,
      statusRef.current?.value,
      getStatusName(statusRef.current?.value),
      params.id
    );

    router.push("/todos");
    router.refresh();
  };

  useEffect(() => {
    getBlogById(params.id)
      .then((data) => {
        if (titleRef.current && contentRef.current && statusRef.current) {
          titleRef.current.value = data.title;
          contentRef.current.value = data.content;
          statusRef.current.value = data.statusId;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <form
      onSubmit={handleUpdate}
      className="bg-white px-4 py-12 my-10 flex flex-col gap-2 shadow-lg"
    >
      <div className="flex">
        <select
          ref={statusRef}
          defaultValue={statusRef.current?.value}
          className="border p-2 mr-2 rounded-md"
        >
          <option value="notstarted">未着手</option>
          <option value="progress">進行中</option>
          <option value="done">完了</option>
        </select>
        <input
          ref={titleRef}
          type="text"
          className="flex-1 border p-2 outline-none"
        />
      </div>

      <textarea ref={contentRef} className="border p-2 outline-none" />
      <button className="bg-blue-500 text-slate-50 p-2 hover:bg-blue-300 hover:text-gray-900 transition-all duration-100">
        更新
      </button>
    </form>
  );
};

export default page;
