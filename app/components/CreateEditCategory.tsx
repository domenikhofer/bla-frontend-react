'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getCategories, getCategory, getCategoryTypes } from '@/app/libs/categoryModel'

interface Props {
    type: string
    categoryId?: string
}

export default function CreateEditCategory(props: Props) {

    const [category, setCategory] = useState<Category>({
        emoji: '',
        name: '',
        parent_id: null,
        category_type_id: null,
        subcategories: []
    })
    const [categories, setCategories] = useState<Category[]>([])
    const [categoryTypes, setCategoryTypes] = useState<CategoryType[]>([])

    const submitCategory = async (formData: FormData) => {
        console.log(formData.get('emoji'), formData.get('name'), formData.get('parent_id'), formData.get('category_type_id'))
    }

    useEffect(() => {
        getCategories().then((c: any) => {
            setCategories(c.data)
        })
        getCategoryTypes().then((ct: any) => {
            setCategoryTypes(ct.data)
        })
        if (props.type === 'edit') {
            getCategory(props.categoryId).then((c: any) => {
                setCategory(c.data)
            })
        }
    }, []);


    return (
        <form action={submitCategory}>
            {
                props.type === 'edit' ?
                    <h2>Edit Category</h2>
                    :
                    <h2>Create Category</h2>
            }
            <label>
                <div className="label">
                    Emoji
                </div>
                <input type="text" name="emoji" maxLength={2} placeholder="" value={category.emoji} />
            </label>
            <label>
                <div className="label">
                    Name
                </div>
                <input type="text" name="name" placeholder="" value={category.name} />
            </label>
            <label>
                <div className="label">
                    Parent Category
                </div>
                <select name="parent_id" v-model="category.parent_id">
                    <option>No Category</option>
                    {categories.map((c: Category) => (
                        <option key={c.id} value={c.id} selected={c.id == category.parent_id}>{c.name}</option>
                    ))}
                </select>
            </label>
            <label>
                <div className="label">
                    Category Type
                </div>
                <select name="category_type_id" v-model="category.category_type_id">
                    <option>No Type</option>
                    {categoryTypes.map((c: CategoryType) => (
                        <option key={c.id} value={c.id} selected={c.id == category.category_type_id}>{c.name}</option>
                    ))}
                </select>
            </label>
            <div className="formActions">
                <button type="submit">✔️</button>
                <Link href="/" className="button">✖️</Link>
            </div>
        </form>
    )
}