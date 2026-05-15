import { createClient } from "@/lib/supabase/server";
import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";
import type { Todo } from "@/types/todo";

export default async function Home() {
  const supabase = await createClient();
  const { data: todos } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  const list = (todos as Todo[]) ?? [];
  const total = list.length;
  const done = list.filter((t) => t.completed).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-start justify-center pt-16 px-4 pb-16">
      <div className="w-full max-w-md">
        {/* 카드 */}
        <div className="bg-white rounded-3xl shadow-xl shadow-violet-100 overflow-hidden">

          {/* 헤더 */}
          <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 pt-8 pb-10">
            <h1 className="text-2xl font-bold text-white mb-1">나의 할 일</h1>
            <p className="text-violet-200 text-sm">
              {total === 0
                ? "오늘의 할 일을 추가해보세요"
                : `${total}개 중 ${done}개 완료`}
            </p>

            {/* 진행 바 */}
            {total > 0 && (
              <div className="mt-4 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${Math.round((done / total) * 100)}%` }}
                />
              </div>
            )}
          </div>

          {/* 입력 영역 */}
          <div className="px-6 -mt-5">
            <AddTodo />
          </div>

          {/* 목록 */}
          <div className="px-6 pb-6 mt-4">
            <TodoList todos={list} />
          </div>
        </div>
      </div>
    </main>
  );
}
