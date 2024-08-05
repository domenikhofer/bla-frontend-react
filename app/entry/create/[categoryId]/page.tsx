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

interface MovieTV {
  id: number;
  image: string;
  url: string;
  value: string;
  isDone: boolean;
  category_id: string;
}

export default function Page({ params }: Params) {
  const [movieTV, setMovieTV] = useState<MovieTV>();
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter()


  const searchMovieTV = async (e: any) => {
    if (e.key == "Enter") {
      e.preventDefault();
      const query = e.target.value;
      const response = await EntryModel.findMovieTVShow(query);
      setSearchResults(response.results);
    }
  };

  const createMediaEntry = async (e: any) => {
    e.preventDefault();
    await EntryModel.addMovieTVShow(movieTV);
      router.push(`/category/${params.categoryId}`);
  };

  const selectMovieTV = (entry: any) => {
    setMovieTV({
      id: entry.id,
      image: entry.poster_path,
      url: `https://www.themoviedb.org/${entry.media_type}/${entry.id}`,
      value: entry.name || entry.title,
      isDone: false,
      category_id: params.categoryId,
    });
  };

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
        {searchResults.map((entry: any) => (
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
