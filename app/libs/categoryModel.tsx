const baseUrl = 'http://localhost/better-list-app/public/api' // Move to .env

export async function getCategories() : Promise<Category[]> {
    const response = await fetch(`${baseUrl}/category`);

    if (!response.ok) {
        throw new Error('Error fetching data');
    } // TODO: add error handling

    return await response.json();
}

export async function getCategory(id?: string) : Promise<Category> {
    const response = await fetch(`${baseUrl}/category/${id}?withEntries=true`);

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