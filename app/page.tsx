'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import getCategories from './libs/getCategories'
import CategoryActions from './components/CategoryActions'

export default function Home() {

// TODO: move into components?

  const [categories, setCategories] = useState<Category[]>([])
  const [editMode, setEditMode] = useState(true)

  useEffect(() => {
    getCategories().then((categories: any) => {
      setCategories(categories.data)
    })
  }, []);

  const categoriesList = categories.map((category) =>
    <>
      <div key={category.id} className="category categoriesTitle">
        <div className="content">
          <h2>{category.name}</h2>
        </div>
        <CategoryActions category={category} className={`${editMode ? 'visible' : ''}`} />
      </div>
      <div className="subcategoriesWrapper">
        <div className="subcategories">
          {category.subcategories.map((subcategory) =>
            <div key={subcategory.id} className="category">
              <div className="content">
                <Link href={`/category/${subcategory.id}`} className="link">
                  <span className="emoji">
                    <span className="icon">
                      {subcategory.emoji}
                    </span>
                  </span>
                  <span className="title">
                    <span className="titleContent">
                      {subcategory.name}
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )

  return (
    <div className={`categoriesWrapper ${editMode ? 'reorder' : ''}`}>
      {categoriesList}
    </div>
  );
}
