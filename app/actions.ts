"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

export async function addTodo(
  formData: FormData
): Promise<{ error: string } | null> {
  const title = formData.get("title") as string;
  if (!title?.trim()) return null;

  const { error } = await getSupabase()
    .from("todos")
    .insert({ title: title.trim() });

  if (error) return { error: error.message };
  revalidatePath("/");
  return null;
}

export async function toggleTodo(id: string, is_completed: boolean) {
  await getSupabase().from("todos").update({ is_completed }).eq("id", id);
  revalidatePath("/");
}

export async function deleteTodo(id: string) {
  await getSupabase().from("todos").delete().eq("id", id);
  revalidatePath("/");
}
