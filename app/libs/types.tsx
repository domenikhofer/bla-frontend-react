interface Category {
    id?: number
    name: string
    emoji: string
    parent_id?: number
    category_type?: CategoryType
    category_type_id?: number
    subcategories: Category[]
    entries?: Entry[]
}

interface CategoryType {
    id: number
    name?: string
}

interface Entry {
    id: number|string
    value: string
    category_id?: number
    url: string
    image: string
    new?: boolean
    category?: {
        id: string;
        emoji: string;
      };
}