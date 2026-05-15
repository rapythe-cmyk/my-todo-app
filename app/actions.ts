"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addTodo(
  formData: FormData
): Promise<{ error: string } | null> {
  const title = formData.get("title") as string;
  if (!title?.trim()) return null;

  const supabase = await createClient();
  const { error } = await supabase.from("todos").insert({ title: title.trim() });
  if (error) return { error: error.message };
  revalidatePath("/");
  return null;
}

export async function toggleTodo(id: string, is_completed: boolean) {
  const supabase = await createClient();
  await supabase.from("todos").update({ is_completed }).eq("id", id);
  revalidatePath("/");
}

export async function deleteTodo(id: string) {
  const supabase = await createClient();
  await supabase.from("todos").delete().eq("id", id);
  revalidatePath("/");
}
