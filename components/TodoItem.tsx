"use client";

import { useTransition } from "react";
import { toggleTodo, deleteTodo } from "@/app/actions";
import type { Todo } from "@/types/todo";

export default function TodoItem({ todo }: { todo: Todo }) {
  const [isPending, startTransition] = useTransition();

  return (
    <li
      className={`group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 border ${
        todo.completed
          ? "bg-gray-50 border-gray-100"
          : "bg-white border-violet-100 shadow-sm shadow-violet-50"
      } ${isPending ? "opacity-60" : ""}`}
    >
      {/* 체크박스 */}
      <button
        onClick={() => startTransition(() => toggleTodo(todo.id, !todo.completed))}
        disabled={isPending}
        aria-label={todo.completed ? "완료 취소" : "완료"}
        className={`shrink-0 flex items-center justify-center w-5 h-5 rounded-full border-2 transition-colors ${
          todo.completed
            ? "bg-violet-500 border-violet-500"
            : "border-gray-300 hover:border-violet-400"
        }`}
      >
        {todo.completed && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* 텍스트 */}
      <span
        className={`flex-1 text-sm leading-snug transition-colors ${
          todo.completed
            ? "text-gray-400 line-through"
            : "text-gray-700"
        }`}
      >
        {todo.title}
      </span>

      {/* 삭제 버튼 */}
      <button
        onClick={() => startTransition(() => deleteTodo(todo.id))}
        disabled={isPending}
        aria-label="삭제"
        className="shrink-0 opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 disabled:opacity-30 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </li>
  );
}
