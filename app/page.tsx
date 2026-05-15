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
  const done = list.filter((t) => t.is_completed).length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center px-4 py-12"
      style={{ background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)" }}>

      {/* 배경 블러 오브 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }} />
        <div className="absolute top-1/2 -right-32 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #ec4899, transparent)" }} />
        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />

        {/* 떠다니는 파티클 */}
        {[...Array(6)].map((_, i) => (
          <div key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${[6, 8, 5, 10, 7, 4][i]}px`,
              height: `${[6, 8, 5, 10, 7, 4][i]}px`,
              left: `${[15, 30, 55, 70, 85, 45][i]}%`,
              top: `${[20, 60, 15, 75, 35, 50][i]}%`,
              background: ["#a78bfa", "#f472b6", "#60a5fa", "#34d399", "#fbbf24", "#e879f9"][i],
              animationDuration: `${[4, 6, 5, 7, 4.5, 6.5][i]}s`,
              animationDelay: `${[0, 1, 2, 0.5, 1.5, 2.5][i]}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* 메인 카드 */}
      <div className="relative w-full max-w-md">
        <div className="glass rounded-3xl overflow-hidden shadow-2xl"
          style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)" }}>

          {/* 헤더 */}
          <div className="relative px-7 pt-8 pb-8 overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.8) 0%, rgba(168,85,247,0.6) 50%, rgba(236,72,153,0.5) 100%)" }}>
            <div className="absolute inset-0 opacity-30"
              style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 40%)" }} />

            <div className="relative">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">✨</span>
                <h1 className="text-3xl font-bold text-white tracking-tight">나의 할 일</h1>
              </div>
              <p className="text-purple-200 text-sm mt-1">
                {total === 0 ? "오늘의 할 일을 추가해보세요" : `${total}개 중 ${done}개 완료 · ${percent}%`}
              </p>

              {/* 진행률 바 */}
              {total > 0 && (
                <div className="mt-4 space-y-1">
                  <div className="h-2 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.15)" }}>
                    <div className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${percent}%`,
                        background: "linear-gradient(90deg, #a78bfa, #f472b6, #fb923c)",
                        boxShadow: percent > 0 ? "0 0 10px rgba(244,114,182,0.8)" : "none",
                      }} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 입력 폼 */}
          <div className="px-6 -mt-5 relative z-10">
            <AddTodo />
          </div>

          {/* 목록 */}
          <div className="px-6 pb-7 mt-5">
            <TodoList todos={list} />
          </div>
        </div>

        {/* 카드 하단 그림자 글로우 */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full blur-xl opacity-40"
          style={{ background: "linear-gradient(90deg, #7c3aed, #ec4899)" }} />
      </div>
    </main>
  );
}
