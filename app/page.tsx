"use client";

import { useState, useEffect } from "react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { getCategories } from "@/app/libs/categoryModel";
import CategoryActions from "@/app/components/CategoryActions";
import plantTop from "/public/images/plantTop.png";
import plantSide from "/public/images/plantSide.png";
import plantBottom from "/public/images/plantBottom.png";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { createClient } from '@supabase/supabase-js'
  import { Auth } from '@supabase/auth-ui-react'
  import { ThemeSupa } from '@supabase/auth-ui-shared'
import React from "react";

  const supabase = createClient(
    "https://ckzpnyzudwngnoqxrgqu.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrenBueXp1ZHduZ25vcXhyZ3F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxMzA3NzUsImV4cCI6MjA2MDcwNjc3NX0.4GDl_iUjvlxgxXylCi1hSJ9vrB7nnMI2dB32n0TCeRA"
  );

  // TODO: logout button + keep scrolling pos + switch all to supabase + only allow movies once + return error if already exists + update project + backup button
  


export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(false);
  const [session, setSession] = useState(null)


  useEffect(() => {
    getCategories().then((c: any) => {
      setCategories(c);
    });
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  }
  else {
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
                  {category.categories?.map((subcategory: Category) => (
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
          {/* <Link className="button" href="https://domenik.ch/bla-backend/public/api/download-backup">💾</Link>
            <button>👋🏻</button> */}
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
}
