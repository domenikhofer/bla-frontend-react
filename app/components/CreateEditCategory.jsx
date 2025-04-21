"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import * as CategoryModel from "../libs/categoryModel";
import { redirect } from "next/navigation";

export default function CreateEditCategory(props) {
  const [category, setCategory] = useState({
    emoji: "",
    name: "",
    parent_id: undefined,
    category_type: undefined,
    categories: [],
  });
  const [hasChildren, setHasChildren] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryTypes, setCategoryTypes] = useState([]);

  const submitCategory = async (formData) => {
    if (props.type === "create") {
      await CategoryModel.createCategory(formData);
      redirect("/");
    }
    await CategoryModel.updateCategory(props.category_id, formData);
    redirect("/");
  };
  useEffect(() => {
    CategoryModel.getCategories().then((c) => {
      setCategories(c);
    })
    CategoryModel.getCategoryTypes().then((ct) => {
      setCategoryTypes(ct);
    });
    if (props.type === "edit") {
      CategoryModel.getCategory(props.category_id, false).then((c) => {
        setCategory(c);
        if (c?.categories?.length > 0) {
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
          name="parent_id"
          value={category.parent_id}
          onChange={(e) => {
            setCategory({ ...category, parent_id: parseInt(e.target.value) });
          }}
        >
          <option value="">No Category</option>
          {categories.map((c) => (
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
          name="category_type_id"
          value={category.category_type?.id}
          onChange={(e) => {
            setCategory({
              ...category,
              category_type: { id: parseInt(e.target.value) },
            });
          }}
        >
          <option value="">No Type</option>
          {categoryTypes.map((c) => (
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
