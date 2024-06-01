interface Category {
    id?: number
    name: string
    emoji: string
    parentId?: number
    categoryType?: CategoryType
    subcategories: Category[]
    entries: Entry[]
}

interface CategoryType {
    id: number
    name?: string
}

interface Entry {
    id: number
    value: string
    categoryId?: number
    url: string
    image: string
}