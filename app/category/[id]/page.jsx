"use client";

import { Link } from "next-view-transitions";
import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import * as CategoryModel from "../../libs/categoryModel";
import * as EntryModel from "../../libs/entryModel";
import { useSearchParams } from "next/navigation";

export default function Page({ params }) {
  const [category, setCategory] = useState();
  const [entries, setEntries] = useState([]);
  const [initialEntries, setInitialEntries] = useState([]);
  const [similarEntries, setSimilarEntries] = useState([]);
  const [justSaved, setJustSaved] = useState(false);
  const [areYouSure, setAreYouSure] = useState(true);
  const [activeEntry, setActiveEntry] = useState();
  const [loading, setLoading] = useState(false);
  const entryRefs = useRef([]);
  const searchParams = useSearchParams();
  const lastEntryId = searchParams.get("backFrom");
  const isDirty = useMemo(
    () => JSON.stringify(initialEntries) != JSON.stringify(entries),
    [initialEntries, entries]
  );

  useEffect(() => {
    const lastScroll = window.localStorage.getItem('scrollPosition')
    setLoading(true)
    setTimeout(() => {
      window.scrollTo({
        top: lastScroll,
      })
      setLoading(false)
    }, 200)
   
    CategoryModel.getCategory(params.id, true).then((c) => {
      setCategory(c);

      if (c.entries && c.entries.length > 0) {
        setEntries(c.entries);
        setInitialEntries(JSON.parse(JSON.stringify(c.entries)));
      } else {
        const template = [
          {
            value: "First Entry",
            id: new Date().getTime(),
            url: "",
            image: "",
            category_id: c.id,
          },
        ];
        setEntries(template);
        setInitialEntries(JSON.parse(JSON.stringify(template)));
      }
    });
  }, []);

const openEntry = (entry) => {
  window.localStorage.setItem('scrollPosition', window.scrollY)
setActiveEntry(entry)
}

  const focusEntry = (entry) => {
    setActiveEntry(entry);
    setSimilarEntries([]);
  };

  const refCallback = useCallback((element) => {
    entryRefs.current.push(element);
    if (element?.dataset.new == "true") {
      element.click();
      element.focus();
    }
  }, []);

  const manipulateEntry = async (e, entry) => {
    if (e.key == "Enter") {
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
      };
      setEntries([
        ...entries.slice(0, entryIndex),
        newElement,
        ...entries.slice(entryIndex),
      ]);
    }

    if (e.key == "Backspace" && (entry.value == "" || entry.value == null)) {
      if (entries.length == 1) {
        return;
      }
      e.preventDefault();
      const entryIndex = entries.indexOf(entry);
      setEntries(entries.filter((e) => e.id !== entry.id));
      let entryRef;
      if (entryIndex == 0) {
        entryRef = entryRefs.current.find(
          (e) => e?.dataset.id == entries[entryIndex + 1].id
        );
      } else {
        entryRef = entryRefs.current.find(
          (e) => e?.dataset.id == entries[entryIndex - 1].id
        );
      }
      entryRef.click();
      entryRef.focus();
      entryRef.setSelectionRange(entryRef.value.length, entryRef.value.length);
      setSimilarEntries([]);
    }
  };

  const saveEntries = async () => {
    setJustSaved(true);
    await EntryModel.createEntries(entries);
    setInitialEntries(JSON.parse(JSON.stringify(entries)));
    setJustSaved(false);
  };

  const goBack = async () => {
    setAreYouSure(false);
  };

  const isMarkup = (entry) => {
    if(entry.value?.startsWith("#")) return "bold"
    return ""
  };

  const findSimilarEntries = async (query) => {
    if (query.length >= 3) {
      const response = await EntryModel.getSimilarEntries(query, category?.id);
      setSimilarEntries(response);
    } else {
      setSimilarEntries([]);
    }
  };

  const webSearch = () => {
    window.open(
      "https://www.google.com/search?q=" + activeEntry?.value.trim(),
      "_blank"
    );
  };

  return (
    <>
      <div className={`entriesWrapper ${loading ? 'loading' : ''}`} data-category={params.id}>
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
                  className={`title ${isMarkup(entry)}`}
                  data-new={entry.new}
                  data-id={entry.id}
                  onKeyUp={(e) =>
                    findSimilarEntries((e.target).value)
                  }
                  onKeyDown={(e) => manipulateEntry(e, entry)}
                  onClick={() => focusEntry(entry)}
                  spellCheck="false"
                  defaultValue={entry.value}
                  ref={refCallback}
                  wrap="soft"
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
                  onClick={() => openEntry(entry)}
                >
                  <span className="image">
                    {entry.image ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${entry.image}`}
                      alt=""
                      className={activeEntry?.id === entry.id ? "active" : ""}
                    />
                  ) : (
                    <div className="image noImage">{entry.value}</div>
                  )}
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="pageActions fixed">
        {!isDirty || !areYouSure ? (
          <Link href="/" className="button">
            ⬅️
          </Link>
        ) : (
          <div className="button" onClick={goBack}>
            ❗
          </div>
        )}

        {category?.category_type_id == null ? (
          <div
            className={`button saveEntries ${
              !isDirty || justSaved ? "disabled" : ""
            }`}
            data-category="category.id"
            onClick={saveEntries}
          >
            {justSaved ? "⌛" : "💾"}
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
