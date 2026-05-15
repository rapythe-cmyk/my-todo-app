"use client";

import { useRef, useTransition } from "react";
import { addTodo } from "@/app/actions";

export default function AddTodo() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      await addTodo(formData);
      formRef.current?.reset();
    });
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="flex gap-2 rounded-2xl p-1.5"
      style={{
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}
    >
      <input
        name="title"
        type="text"
        placeholder="새로운 할 일을 입력하세요..."
        required
        className="flex-1 bg-transparent text-white placeholder-purple-300/60 text-sm outline-none px-3 py-2"
      />
      <button
        type="submit"
        disabled={isPending}
        className="shrink-0 flex items-center gap-1.5 text-white text-sm font-bold rounded-xl px-5 py-2.5 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:scale-100 shimmer-btn"
        style={{ boxShadow: "0 4px 15px rgba(139,92,246,0.5)" }}
      >
        {isPending ? (
          <span className="block h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        )}
        추가
      </button>
    </form>
  );
}
