// @ts-check

import Image from "next/image";
import Link from 'next/link'

export default function Home() {

  const data = [
    {
      "id": 1,
      "name": "Activities",
      "emoji": null,
      "subcategories": [
        {
          "id": 2,
          "name": "Summer",
          "emoji": "\u2600\ufe0f",
          "subcategories": [],
          "category_type_id": null,
          "deleted_at": null,
          "parent_id": 1
        },
        {
          "id": 3,
          "name": "Winter",
          "emoji": "\u2744\ufe0f",
          "subcategories": [],
          "category_type_id": null,
          "deleted_at": null,
          "parent_id": 1
        }
      ],
      "category_type_id": null,
      "deleted_at": null,
      "parent_id": null
    },
    {
      "id": 4,
      "name": "Media",
      "emoji": null,
      "subcategories": [
        {
          "id": 5,
          "name": "Movies",
          "emoji": "\ud83c\udfac",
          "subcategories": [],
          "category_type_id": 1,
          "deleted_at": null,
          "parent_id": 4
        },
        {
          "id": 6,
          "name": "Series",
          "emoji": "\ud83d\udcfa",
          "subcategories": [],
          "category_type_id": 1,
          "deleted_at": null,
          "parent_id": 4
        },
        {
          "id": 7,
          "name": "Games",
          "emoji": "\ud83c\udfae",
          "subcategories": [],
          "category_type_id": null,
          "deleted_at": null,
          "parent_id": 4
        },
        {
          "id": 8,
          "name": "Books",
          "emoji": "\ud83d\udcd8",
          "subcategories": [],
          "category_type_id": null,
          "deleted_at": null,
          "parent_id": 4
        }
      ],
      "category_type_id": null,
      "deleted_at": null,
      "parent_id": null
    },
    {
      "id": 9,
      "name": "Food",
      "emoji": null,
      "subcategories": [
        {
          "id": 10,
          "name": "Restaurants ZH",
          "emoji": "\ud83c\udf7d\ufe0f",
          "subcategories": [],
          "category_type_id": null,
          "deleted_at": null,
          "parent_id": 9
        },
        {
          "id": 11,
          "name": "Restaurants Elsewhere",
          "emoji": "\ud83c\udf5c",
          "subcategories": [],
          "category_type_id": null,
          "deleted_at": null,
          "parent_id": 9
        },
        {
          "id": 12,
          "name": "Recipes",
          "emoji": "\ud83d\udcc4",
          "subcategories": [],
          "category_type_id": null,
          "deleted_at": null,
          "parent_id": 9
        },
        {
          "id": 13,
          "name": "Cooking \/ Baking Ideas",
          "emoji": "\ud83e\udd50",
          "subcategories": [],
          "category_type_id": null,
          "deleted_at": null,
          "parent_id": 9
        }
      ],
      "category_type_id": null,
      "deleted_at": null,
      "parent_id": null
    },
    {
      "id": 14,
      "name": "Projects",
      "emoji": null,
      "subcategories": [
        {
          "id": 15,
          "name": "General",
          "emoji": "\ud83e\ude9a",
          "subcategories": [],
          "category_type_id": null,
          "deleted_at": null,
          "parent_id": 14
        },
        {
          "id": 16,
          "name": "Programming",
          "emoji": "\ud83d\udcbb",
          "subcategories": [],
          "category_type_id": null,
          "deleted_at": null,
          "parent_id": 14
        }
      ],
      "category_type_id": null,
      "deleted_at": null,
      "parent_id": null
    },
    {
      "id": 17,
      "name": "Other",
      "emoji": null,
      "subcategories": [
        {
          "id": 18,
          "name": "Gift-Ideas",
          "emoji": "\ud83c\udf81",
          "subcategories": [],
          "category_type_id": null,
          "deleted_at": null,
          "parent_id": 17
        },
        {
          "id": 19,
          "name": "Miscellaneous",
          "emoji": "\u2728",
          "subcategories": [],
          "category_type_id": null,
          "deleted_at": null,
          "parent_id": 17
        }
      ],
      "category_type_id": null,
      "deleted_at": null,
      "parent_id": null
    }
  ]

  const categories = data.map((category) =>
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
    <div className="categoriesWrapper">
      {categories}
    </div>
  );
}
