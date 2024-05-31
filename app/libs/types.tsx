interface Category {
    id?: number
    name: string
    emoji: string
    parentId?: number
    categoryType?: CategoryType
    subcategories: Category[]
}

interface CategoryType {
    id: number
    name?: string
}