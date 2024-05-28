export default async function getCategories() : Promise<Category[]> {
    const response = await fetch('http://localhost/better-list-app/public/api/category');

    if (!response.ok) {
        throw new Error('Error fetching data');
    } // TODO: add error handling

    return await response.json();
}