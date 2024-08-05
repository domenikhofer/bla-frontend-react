const baseUrl = 'https://domenik.ch/bla-backend/public/api' // Move to .env

export async function createEntries(entries: Entry[]) {
  const response = await fetch(`${baseUrl}/entry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      category_id: entries[0].category_id,
      entries: entries}),
  });

  if (!response.ok) {
    throw new Error("Error fetching data");
  }
}

export async function addMovieTVShow(data: any) {
  delete data.id;
  const response = await fetch(`${baseUrl}/entry/store-media`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error fetching data");
  }
}

export async function getEntry(id?: string): Promise<Entry> {
  const response = await fetch(`${baseUrl}/entry/${id}`);

  if (!response.ok) {
    throw new Error("Error fetching data");
  }

  return await response.json();
}

export async function getSimilarEntries(query: string, categoryId?: number) {
  const response = await fetch(
    `${baseUrl}/entry/search?category_id=${categoryId}&query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Error fetching data");
  }

  return await response.json();
}

export async function deleteEntry(id: any) {
  const response = await fetch(`${baseUrl}/entry/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error fetching data");
  }
}

export async function findMovieTVShow(query: string) {
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
