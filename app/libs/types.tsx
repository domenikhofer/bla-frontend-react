interface Category {
    id?: number
    name: string
    emoji: string
    parent_id: number|null
    category_type_id: number|null
    subcategories: Category[]
}

interface CategoryType {
    id: number
    name: string
}