'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {

// TODO: move into components?

  interface Category {
    id: number
    name: string
    emoji: string
    subcategories: Category[]
  }

  const [categories, setCategories] = useState<Category[]>([])
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost/better-list-app/public/api/category');
        const result = await response.json();
        setCategories(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const categoriesList = categories.map((category) =>
    <>
      <div key={category.id} className="category categoriesTitle">
        <div className="content">
          <h2>{category.name}</h2>
        </div>
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
    <div className={`categoriesWrapper ${editMode ? 'editMode' : ''}`}>
      {categoriesList}
    </div>
  );
}
