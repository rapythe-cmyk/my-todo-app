import type { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

export default function TodoList({ todos }: { todos: Todo[] }) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center py-12 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 text-violet-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-sm font-medium">할 일이 없어요</p>
        <p className="text-xs mt-1">위 입력창에서 추가해보세요!</p>
      </div>
    );
  }

  const remaining = todos.filter((t) => !t.completed);
  const completed = todos.filter((t) => t.completed);

  return (
    <div className="space-y-2">
      {/* 미완료 */}
      {remaining.length > 0 && (
        <ul className="space-y-2">
          {remaining.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}

      {/* 완료 */}
      {completed.length > 0 && (
        <div className="pt-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-1 mb-2">
            완료됨 {completed.length}
          </p>
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
