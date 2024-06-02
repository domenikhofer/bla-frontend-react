const baseUrl = 'http://localhost:5173/api' // Move to .env

export async function createEntries(entries: Entry[]) {
    const response = await fetch(`${baseUrl}/entry`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(entries),
    });

    if (!response.ok) {
        throw new Error('Error fetching data');
    }
}

export async function getEntry(id?: string) : Promise<Entry> {
    const response = await fetch(`${baseUrl}/entry/${id}`);

    if (!response.ok) {
        throw new Error('Error fetching data');
    }

    return await response.json();
}

export async function getSimilarEntries(query: string, categoryId?: number) {
    const response = await fetch(`${baseUrl}/entry/search/${categoryId}/${encodeURIComponent(query)}`);

    if (!response.ok) {
        throw new Error('Error fetching data');
    }

    return await response.json();
}

export async function deleteEntry(id?: number) {
    const response = await fetch(`${baseUrl}/entry/${id}`, {
        method: 'DELETE'
    });

    // TODO: actually Delete entry in Backend

    if (!response.ok) {
        throw new Error('Error fetching data');
    }
}