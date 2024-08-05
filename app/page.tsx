"use client";

import { useState, useEffect } from "react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { getCategories } from "@/app/libs/categoryModel";
import CategoryActions from "@/app/components/CategoryActions";
import plantTop from "/public/images/plantTop.png";
import plantSide from "/public/images/plantSide.png";
import plantBottom from "/public/images/plantBottom.png";
import { signOut } from "next-auth/react"
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(false);

  useEffect(() => {
    getCategories().then((c: any) => {
      setCategories(c);
    });
  }, []);

  return (
    <>
      <div className={`categoriesWrapper ${editMode ? "reorder" : ""}`}>
        {categories.map((category: Category) => (
          <>
            <div
              key={category.id}
              id={`cat${category.id}`}
              className="category categoriesTitle"
            >
              
              <div className="content">
                <h2>{category.name}</h2>
              </div>
              <CategoryActions
                category={category}
                categories={categories}
                setCategories={setCategories}
                className={`${editMode ? "visible" : ""}`}
              />
            </div>
            <div className="subcategoriesWrapper">
              {category.id == 9 && (
                <div className={`plantSide ${!editMode ? "visible" : ""}`}>
                  <Image src={plantSide} alt="" />
                </div>
              )}
              <div className="subcategories">
                <TransitionGroup component={null}>
                  {category.subcategories.map((subcategory: Category) => (
                    <CSSTransition
                      component={null}
                      key={subcategory.id}
                      timeout={200}
                    >
                      <div
                        key={subcategory.id}
                        id={`cat${subcategory.id}`}
                        className="category"
                      >
                        <div className="content">
                          <Link
                            href={`/category/${subcategory.id}`}
                            className="link"
                          >
                            <span className="emoji">
                              <span className="icon">{subcategory.emoji}</span>
                            </span>
                            <span className="title">
                              <span className="titleContent">
                                {subcategory.name}
                              </span>
                            </span>
                          </Link>
                        </div>
                        <CategoryActions
                          category={subcategory}
                          categories={categories}
                          setCategories={setCategories}
                          className={`${editMode ? "visible" : ""}`}
                        />
                      </div>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </div>
            </div>
          </>
        ))}
        <div className={`plantTop ${!editMode ? "visible" : ""}`}>
          <Image src={plantTop} alt="" />
        </div>
        <div
          className={`plantBottomWrapper ${showEditBtn ? "clicked" : ""} ${
            editMode ? "" : "visible"
          }`}
          onClick={() => setShowEditBtn(true)}
        >
          <div className="plantBottom">
            <Image src={plantBottom} alt="" />
          </div>
        </div>
      </div>
      <div className="pageActions">
        {editMode ? (
          <>
            <button onClick={() => signOut()}>👋🏻</button>
            <Link className="button" href="/category/create">
              ➕
            </Link>
            <a
              className="button"
              onClick={() => {
                setEditMode(false);
                setShowEditBtn(false);
              }}
            >
              ✖️
            </a>
          </>
        ) : (
          <>
            <a className="button" onClick={() => setEditMode(true)}>
              ✏️
            </a>
          </>
        )}
      </div>
    </>
  );
}
