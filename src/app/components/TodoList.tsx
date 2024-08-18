import { Todo } from "@prisma/client";
import Link from "next/link";
import React from "react";

async function fetchAllTodos() {
  const res = await fetch(`http://localhost:3000/api/todo`, {
    cache: "no-cache",
  });

  const data = await res.json();

  return data.todos;
}

const TodoList = async () => {
  const todos = await fetchAllTodos();

  return (
    <ul className="pb-2">
      {todos.map((todo: Todo) => (
        <li
          key={todo.id}
          className="flex flex-col bg-white p-4 mb-4 shadow-lg hover:shadow-none hover:translate-y-1 transition-all duration-100"
        >
          <Link href={`/todos/${todo.id}`} className="flex flex-col">
            <div className="flex pb-2 border-b-2">
              <span className="p-1 bg-blue-100 rounded-md">
                {todo.statusName}
              </span>
              <p className="p-1 ml-3">{todo.title}</p>
            </div>
            <p className="pt-2">{todo.content}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
