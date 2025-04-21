import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://ckzpnyzudwngnoqxrgqu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrenBueXp1ZHduZ25vcXhyZ3F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxMzA3NzUsImV4cCI6MjA2MDcwNjc3NX0.4GDl_iUjvlxgxXylCi1hSJ9vrB7nnMI2dB32n0TCeRA"
);

export async function getCategories(){
  const { data } = await supabase
    .from("categories")
    .select(
      `
        id,
        name ,
        emoji,
        category_type_id ,
        order_column ,
        created_at ,
        updated_at ,
        deleted_at,
        categories (*)
    `
    )
    .is("parent_id", null)
    .is("deleted_at", null)
    .is("categories.deleted_at", null);

  return data;
}

export async function getCategory(
  id,
  withEntries
) {
  if (withEntries) {
    const { data } = await supabase
      .from("categories")
      .select(
        `
            id,
            name,
            emoji,
            parent_id,
            category_type_id ,
            order_column ,
            created_at ,
            updated_at ,
            deleted_at,
            entries(*)
        `
      )
      .eq("id", id)
      .is("deleted_at", null)
      .is("entries.deleted_at", null)

    return data ? data[0] : [];
  } else {
    const { data } = await supabase
      .from("categories")
      .select(
        `
            id,
            name ,
            emoji,
            parent_id,
            category_type_id ,
            order_column ,
            created_at ,
            updated_at ,
            deleted_at
        `
      )
      .eq("id", id)
      .is("deleted_at", null);

    return data ? data[0] : [];
  }
}

export async function getCategoryTypes() {
  const { data } = await supabase.from("category_types").select(`
   *
`);
  return data;
}

export async function createCategory(formData) {
  const { error } = await supabase.from("categories").insert({
    emoji: formData.get("emoji"),
    name: formData.get("name"),
    parent_id: formData.get("parent_id") || undefined,
    category_type_id: formData.get("category_type_id") || undefined,
  });
}

export async function updateCategory(id, formData) {
  const { error } = await supabase
    .from("categories")
    .update({
      emoji: formData.get("emoji"),
      name: formData.get("name"),
      parent_id: formData.get("parent_id") || undefined,
      category_type_id: formData.get("category_type_id") || undefined,
    })
    .eq("id", id);
}

export async function deleteCategory(id) {
    const { error } = await supabase
    .from("categories")
    .update({
      deleted_at: new Date()
    })
    .eq("id", id);
}
