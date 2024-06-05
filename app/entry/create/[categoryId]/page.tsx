"use client";

import { useState } from "react";
import { Link } from "next-view-transitions";
import * as EntryModel from "@/app/libs/entryModel";
import { useRouter } from "next/navigation";


interface Params {
  params: {
    categoryId: string;
  };
}

export default function Page({ params }: Params) {
  const [movieTV, setMovieTV] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter()


  const searchMovieTV = async (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      const query = e.target.value;
      const response = await EntryModel.findMovieTVShow(query);
      setSearchResults(response.results);
    }
  };

  const createMediaEntry = async (e) => {
    e.preventDefault();
    console.log(movieTV);
    await EntryModel.addMovieTVShow(movieTV);
    document.startViewTransition(() => {
      router.push(`/category/${params.categoryId}`);
    })
  };

  const selectMovieTV = (entry) => {
    setMovieTV({
      id: entry.id,
      image: entry.poster_path,
      url: `https://www.themoviedb.org/${entry.media_type}/${entry.id}`,
      value: entry.name || entry.title,
      isDone: false,
      categoryId: params.categoryId,
    });
  };

  // TODO: don't allow empty entries
  // TODO: dont allow duplicates

  return (
    <form onSubmit={(e) => createMediaEntry(e)} method="post">
      <h2>Add Entry</h2>
      <label>
        <div className="label">Enter a Movie/TV Show and Press Enter</div>
        <input
          type="search"
          onKeyDown={(e) => searchMovieTV(e)}
          className="searchMovieTV"
          placeholder=""
        />
      </label>
      <div className="imageEntryWrapper">
        {searchResults.map((entry) => (
          <div
            key={entry.id}
            onClick={() => selectMovieTV(entry)}
            className={`entry searchResult ${
              movieTV.id == entry.id ? "selected" : ""
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
