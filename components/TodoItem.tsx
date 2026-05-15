"use client";

import { useTransition } from "react";
import { toggleTodo, deleteTodo } from "@/app/actions";
import type { Todo } from "@/types/todo";

export default function TodoItem({ todo }: { todo: Todo }) {
  const [isPending, startTransition] = useTransition();

  return (
    <li
      className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-300 animate-slide-in ${isPending ? "opacity-50 scale-98" : "hover:scale-[1.01]"}`}
      style={
        todo.is_completed
          ? {
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }
          : {
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
            }
      }
    >
      {/* 완료 시 좌측 컬러 바 */}
      {todo.is_completed && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-full"
          style={{ background: "linear-gradient(180deg, #a78bfa, #f472b6)" }} />
      )}

      {/* 체크 버튼 */}
      <button
        onClick={() => startTransition(() => toggleTodo(todo.id, !todo.is_completed))}
        disabled={isPending}
        aria-label={todo.is_completed ? "완료 취소" : "완료"}
        className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200 hover:scale-110"
        style={
          todo.is_completed
            ? {
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                boxShadow: "0 0 12px rgba(139,92,246,0.6)",
                border: "none",
              }
            : {
                background: "transparent",
                border: "2px solid rgba(167,139,250,0.5)",
              }
        }
      >
        {todo.is_completed && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white animate-check-pop" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* 텍스트 */}
      <span className={`flex-1 text-sm leading-snug transition-all duration-300 ${
        todo.is_completed
          ? "line-through text-white/30"
          : "text-white/90"
      }`}>
        {todo.title}
      </span>

      {/* 삭제 버튼 */}
      <button
        onClick={() => startTransition(() => deleteTodo(todo.id))}
        disabled={isPending}
        aria-label="삭제"
        className="shrink-0 opacity-0 group-hover:opacity-100 flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-30"
        style={{
          background: "rgba(239,68,68,0.15)",
          border: "1px solid rgba(239,68,68,0.2)",
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </li>
  );
}
