const baseUrl = 'http://localhost/better-list-app/bla/public/api' // Move to .env

export async function getCategories() : Promise<Category[]> {
    const response = await fetch(`${baseUrl}/category`);

    if (!response.ok) {
        throw new Error('Error fetching data');
    }

    return await response.json();
}

export async function getCategory(id?: string, withEntries? : Boolean) : Promise<Category> {
    const response = await fetch(`${baseUrl}/category/${id}?withEntries=${withEntries}`);

    if (!response.ok) {
        throw new Error('Error fetching data');
    }

    return await response.json();
}

export async function getCategoryTypes() : Promise<CategoryType[]> {
    const response = await fetch(`${baseUrl}/category/types`);

    if (!response.ok) {
        throw new Error('Error fetching data');
    }

    return await response.json();
}

export async function createCategory(formData: FormData) {
    const response = await fetch(`${baseUrl}/category`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error('Error fetching data');
    }
}

export async function updateCategory(id: string, formData: FormData) {
    const response = await fetch(`${baseUrl}/category/${id}?_method=PUT`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
          },
        body: formData
    });

    if (!response.ok) {
        throw new Error('Error fetching data');
    }
}

export async function deleteCategory(id?: number) {
    const response = await fetch(`${baseUrl}/category/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Error fetching data');
    }
}