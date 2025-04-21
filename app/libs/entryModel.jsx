import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://ckzpnyzudwngnoqxrgqu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrenBueXp1ZHduZ25vcXhyZ3F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxMzA3NzUsImV4cCI6MjA2MDcwNjc3NX0.4GDl_iUjvlxgxXylCi1hSJ9vrB7nnMI2dB32n0TCeRA"
);

export async function createEntries(entries) {
  const response = await supabase.from('entries').delete().eq('category_id',entries[0].category_id )
  const { error } = await supabase.from("entries").insert(entries);
}

export async function addMovieTVShow(data) {
  delete data.id;
  const { error } = await supabase.from("entries").insert(data);

}

export async function getEntry(id) {
  const { data } = await supabase
      .from("entries")
      .select(
        `
           *
        `
      )
      .eq("id", id)
      .is("deleted_at", null);

    return data ? data[0] : [];
}

export async function getSimilarEntries(query, categoryId) {

  const { data, error } = await supabase.from('entries').select().eq('category_id', categoryId).like('value', `%${query}%`)

return data
}

export async function deleteEntry(id) {
  const { error } = await supabase
  .from("entries")
  .update({
    deleted_at: new Date()
  })
  .eq("id", id);
}

export async function findMovieTVShow(query) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${query}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDk5YmYwNzMyMjU5MGRiNjM2N2RkOTk3MzcwMDc2NSIsInN1YiI6IjY1ZjlhODM4MjRiMzMzMDE2MTdhNDM0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O5HWEE0uBRS_WwNo0g4-TZKgKueV9aTyssQqXr6BNUM",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching data");
  }

  return await response.json();
}
