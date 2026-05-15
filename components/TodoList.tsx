import type { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

export default function TodoList({ todos }: { todos: Todo[] }) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center py-14">
        <div className="relative mb-4">
          <div className="absolute inset-0 rounded-full blur-xl opacity-40"
            style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl"
            style={{
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(167,139,250,0.3)",
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="url(#grad1)">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#f472b6" />
                </linearGradient>
              </defs>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        </div>
        <p className="text-sm font-semibold text-white/60">할 일이 없어요</p>
        <p className="text-xs mt-1 text-white/30">위에서 새 할 일을 추가해보세요!</p>
      </div>
    );
  }

  const remaining = todos.filter((t) => !t.is_completed);
  const completed = todos.filter((t) => t.is_completed);

  return (
    <div className="space-y-3">
      {remaining.length > 0 && (
        <ul className="space-y-2">
          {remaining.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}

      {completed.length > 0 && (
        <div className="pt-1">
          <div className="flex items-center gap-2 px-1 mb-2">
            <div className="h-px flex-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
            <span className="text-xs font-semibold text-white/30 uppercase tracking-widest">
              완료 {completed.length}
            </span>
            <div className="h-px flex-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
          </div>
          <ul className="space-y-2">
            {completed.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
