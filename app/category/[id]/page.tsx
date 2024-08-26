"use client";

import { Link } from 'next-view-transitions'
import { useRef, useEffect, useState, useCallback } from "react";
import * as CategoryModel from "@/app/libs/categoryModel";
import * as EntryModel from "@/app/libs/entryModel";
import { useSearchParams } from 'next/navigation'


interface Params {
  params: {
    id: string;
  };
}

export default function Page({ params }: Params) {
  const [category, setCategory] = useState<Category>();
  const [entries, setEntries] = useState<Entry[]>([]); 
  const [similarEntries, setSimilarEntries] = useState<Entry[]>([]);
  const [justSaved, setJustSaved] = useState(false);
  const [activeEntry, setActiveEntry] = useState<Entry>();
  const entryRefs = useRef<any>([]);
  const searchParams = useSearchParams()
  const lastEntryId = searchParams.get('backFrom')
  
  useEffect(() => {
   
    CategoryModel.getCategory(params.id, true).then((c: Category) => {
      setCategory(c);
      if (c.entries && c.entries.length > 0) {
        setEntries(c.entries);
      } else {
        setEntries([
          {
            value: "First Entry",
            id: new Date().getTime(),
            url: "",
            image: "",
            category_id: c.id,
          },
        ]);
      }
    });
  }, []);
  
  
  const focusEntry = (entry: Entry) => {
    setActiveEntry(entry);
    setSimilarEntries([]);
  };

  const refCallback = useCallback((element: any) => {
    entryRefs.current.push(element);
    if(element?.dataset.new == 'true') {
      element.click();
      element.focus();
    }
  }, []);

  const manipulateEntry = async (e: any, entry: Entry) => {
    
    if (e.key == 'Enter') {
      e.preventDefault();
      setSimilarEntries([]);
      const entryIndex = entries.indexOf(entry) + 1;
      const newElement = {
        value: "",
        id: new Date().getTime(),
        url: "",
        image: "",
        category_id: category?.id,
        new: true,
      }
      setEntries([...entries.slice(0, entryIndex), newElement, ...entries.slice(entryIndex)]);
    }
    
    if(e.key == 'Backspace' && entry.value == '') {
      e.preventDefault();
      const entryIndex = entries.indexOf(entry);
      setEntries(entries.filter(e => e.id !== entry.id));
      const entryRef = entryRefs.current.find( (e: any) => e?.dataset.id == entries[entryIndex - 1].id)
      entryRef.click();
      entryRef.focus();
      setSimilarEntries([]);
    }
}

  const saveEntries = async () => {
    await EntryModel.createEntries(entries);
    setJustSaved(true);
    setTimeout(() => {
      setJustSaved(false);
    }, 1000);
  };

  const findSimilarEntries = async (query: string) => {
    if (query.length >= 3) {
        const response = await EntryModel.getSimilarEntries(query, category?.id)
       setSimilarEntries(response);
    } else {
        setSimilarEntries([]);
    }
}

  const webSearch = () => {
    window.open(
      "https://www.google.com/search?q=" + activeEntry?.value.trim(),
      "_blank"
    );
  };

  return (
    <>
      <div className="entriesWrapper" data-category={params.id}>
        <div className="emoji">{category?.emoji}</div>
        <div className="header">
          <h1>{category?.name}</h1>
        </div>
        {category?.category_type_id == null ? (
          <div className="entryWrapper">
            {entries.map((entry, index) => (
              <div
                key={entry.id}
                className={`entry ${
                  activeEntry?.id == entry.id ? "active" : ""
                }`}
              >
                <textarea
                  className="title"
                  data-new={entry.new}
                  data-id={entry.id}
                  onKeyUp={(e) => findSimilarEntries((e.target as HTMLInputElement).value)}
                  onKeyDown={(e) => manipulateEntry(e, entry)}
                  onClick={() => focusEntry(entry)}
                  spellCheck="false"
                  defaultValue={entry.value}
                  ref={refCallback}
                  wrap='soft'
                  onChange={(e) => {
                    entry.value = e.target.value;
                    setEntries([...entries]);
                  }}
                ></textarea>
                <div className="actions">
                  <a onClick={webSearch} className="link" target="_blank">
                    🔍
                  </a>
                </div>
                <div className="similar">
                  <div className="label">Existing Entries</div>
                  {similarEntries.length ? (
                    <div className="results">
                      {similarEntries.map((se) => (
                        <div key={se.id}>{se.value}</div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="imageEntryWrapper">
              {category?.entries?.map((entry) => (
                <Link
                  key={entry.id}
                  className="entry"
                  href={`/entry/${entry.id}`}
                  onClick={() => setActiveEntry(entry)}
                >
                  <span className="image">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${entry.image}`}
                      alt=""
                      className={activeEntry?.id === entry.id ? "active" : ""}
                    />
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="pageActions fixed">
        <Link href="/" className="button">
          ⬅️
        </Link>
        {category?.category_type_id == null ? (
          <div
            className="button saveEntries"
            data-category="category.id"
            onClick={saveEntries}
          >
            {justSaved ? "✅" : "💾"}
          </div>
        ) : (
          <Link
            href={`/entry/create/${category.id}`}
            className="button addEntry"
          >
            ➕
          </Link>
        )}
      </div>
    </>
  );
}
