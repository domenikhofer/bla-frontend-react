"use client";

import { useEffect, useState } from "react";
import { Link } from "next-view-transitions";
import * as EntryModel from "../../../libs/entryModel";
import * as CategoryModel from "../../../libs/categoryModel";

import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const [movieTV, setMovieTV] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [category, setCategory] = useState();
  const [filteredEntries, setFilteredEntries] = useState([])

  const router = useRouter()

  useEffect(() => {
 CategoryModel.getCategory(params.categoryId, true).then((c) => {
      setCategory(c);
 })
 window.localStorage.setItem('scrollPosition', 0)
  }, [])


  const searchMovieTV = async (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      const query = e.target.value;
      const response = await EntryModel.findMovieTVShow(query);
      setSearchResults(response);
    }
  };

  const createMediaEntry = async (e) => {
    e.preventDefault();
    await EntryModel.addMovieTVShow(movieTV);
      router.push(`/category/${params.categoryId}`);
  };

  const selectMovieTV = (entry) => {
    const entries = category.entries.filter((el) => {
      return el.url == `https://www.themoviedb.org/${entry.media_type}/${entry.id}`
    })

    setFilteredEntries(entries)
    setMovieTV({
      id: entry.id,
      image: entry.poster_path,
      url: `https://www.themoviedb.org/${entry.media_type}/${entry.id}`,
      value: entry.name || entry.title,
      // isDone: false,
      category_id: params.categoryId,
    });
  };

  return (
    <form onSubmit={(e) => createMediaEntry(e)} method="post">

      <div className={`existingMedia ${filteredEntries.length ? 'visible' : ''}`}>
      <div>
    
        Media already exists in DB!
        </div>
      </div>
      <h2>Add Entry</h2>
      <label>
        <div className="label">Enter Movie/TV Show and hit Enter</div>
        <input
          type="search"
          onKeyDown={(e) => searchMovieTV(e)}
          className="searchMovieTV"
          placeholder=""
        />
      </label>
      {searchResults?.total_results < 1 ? (<p>No Results</p>) : null}
      <div className="imageEntryWrapper">
        {searchResults?.results?.map((entry) => (
          <div
            key={entry.id}
            onClick={() => selectMovieTV(entry)}
            className={`entry searchResult ${
              movieTV?.id == entry.id ? "selected" : ""
            }`}
          >
            <div className="image">
              {entry.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${entry.poster_path}`}
                />
              ) : (
                <div className="image noImage">{entry.name || entry.title}</div>
              )}
              {entry.media_type === "movie" ? (<div className="mediaType">🎬</div>) : (<div className="mediaType">📺</div>)}
            </div>
          </div>
        ))}
      </div>
      
      <div className="formActions fixed">
        {movieTV?.id ? <button type="submit">✔️</button> : null}
        <Link href={`/category/${params.categoryId}`} className="button">
          ✖️
        </Link>
      </div>
    </form>
  );
}
