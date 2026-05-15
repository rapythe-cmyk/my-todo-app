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
      className="flex gap-2 bg-white rounded-2xl shadow-lg shadow-violet-100 border border-violet-100 px-3 py-3"
    >
      <input
        name="title"
        type="text"
        placeholder="할 일을 입력하세요..."
        required
        className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none px-1"
      />
      <button
        type="submit"
        disabled={isPending}
        className="shrink-0 flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 disabled:opacity-60 text-white text-sm font-semibold rounded-xl px-4 py-2 transition-colors"
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
