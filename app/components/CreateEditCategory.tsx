"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import * as CategoryModel from "@/app/libs/categoryModel";
import { redirect } from "next/navigation";

interface Props {
  type: string;
  categoryId: string;
}

export default function CreateEditCategory(props: Props) {
  const [category, setCategory] = useState<Category>({
    emoji: "",
    name: "",
    parentId: undefined,
    categoryType: undefined,
    subcategories: [],
  });
  const [hasChildren, setHasChildren] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryTypes, setCategoryTypes] = useState<CategoryType[]>([]);

  const submitCategory = async (formData: FormData) => {
    if (props.type === "create") {
      await CategoryModel.createCategory(formData);
      redirect("/");
    }
    await CategoryModel.updateCategory(props.categoryId, formData);
    redirect("/");
  };
  useEffect(() => {
    CategoryModel.getCategories().then((c: Category[]) => {
      setCategories(c);
    })
    CategoryModel.getCategoryTypes().then((ct: CategoryType[]) => {
      setCategoryTypes(ct);
    });
    if (props.type === "edit") {
      CategoryModel.getCategory(props.categoryId, false).then((c: Category) => {
        setCategory(c);
        if (c.subcategories.length > 0) {
          setHasChildren(true);
        }
      });
    }
  }, []);

  return (
    <form action={submitCategory}>
      {props.type === "edit" ? (
        <h2>Edit Category</h2>
      ) : (
        <h2>Create Category</h2>
      )}
      {!hasChildren && (
        <label>
          <div className="label">Emoji</div>
          <input
            type="text"
            name="emoji"
            maxLength={2}
            placeholder=""
            defaultValue={category.emoji}
          />
        </label>
      )}
      <label>
        <div className="label">Name</div>
        <input
          type="text"
          name="name"
          placeholder=""
          defaultValue={category.name}
        />
      </label>
      {!hasChildren && (
      <label>
        <div className="label">Parent Category</div>
        <select
          name="parentId"
          value={category.parentId}
          onChange={(e) => {
            setCategory({ ...category, parentId: parseInt(e.target.value) });
          }}
        >
          <option value="">No Category</option>
          {categories.map((c: Category) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
      )}
      <label>
        <div className="label">Category Type</div>
        <select
          name="categoryTypeId"
          value={category.categoryType?.id}
          onChange={(e) => {
            setCategory({
              ...category,
              categoryType: { id: parseInt(e.target.value) },
            });
          }}
        >
          <option value="">No Type</option>
          {categoryTypes.map((c: CategoryType) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
      <div className="formActions">
        <button type="submit">✔️</button>
        <Link href="/" className="button">
          ✖️
        </Link>
      </div>
    </form>
  );
}
