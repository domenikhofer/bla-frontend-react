"use client";

import { useState, useEffect } from "react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { getBackup, getCategories } from "../app/libs/categoryModel";
import CategoryActions from "../app/components/CategoryActions";
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

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(false);
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(false)

  const backup = () => {
    getBackup().then((data) => {
      const fileName = `backup-${new Date()}`
      const jsonData = new Blob([JSON.stringify(data)], { type: 'application/json' });
      const jsonURL = URL.createObjectURL(jsonData);
      const link = document.createElement('a');
      link.href = jsonURL;
      link.download = `${fileName}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
  }


  useEffect(() => {
    setLoading(true)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
   
      getCategories().then((c) => {
        setCategories(c);
      });
  
    setLoading(false)
    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (<div className={`loginWrapper ${loading ? 'loading' : ''}`}><Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} /></div>)
  }
  else {
  return (
    <>
      <div className={`categoriesWrapper ${editMode ? "reorder" : ""} ${loading ? 'loading' : ''}`}>
        {categories.map((category) => (
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
                  {category.categories?.map((subcategory) => (
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
            <a className="button" onClick={backup}>
            💾
            </a>
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
