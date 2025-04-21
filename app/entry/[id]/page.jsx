"use client";

import { Link } from "next-view-transitions";
import { useEffect, useState } from "react";
import * as EntryModel from "@/app/libs/entryModel";
import { CSSTransition } from 'react-transition-group'
import Modal from '@/app/components/Modal'
import { useRouter } from "next/navigation";


export default function Page({ params }) {
  const [entry, setEntry] = useState();
  const [deletionState, setDeletionState] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter()



  useEffect(() => {
      EntryModel.getEntry(params.id).then((e) => {
        setEntry(e);
      })
  }, []);

  const openModal = async () => {
    setShowModal(true);
}

  const deleteEntry = async () => {
    setShowModal(false);
    setDeletionState("shredded");
    setTimeout(() => {
      setDeletionState("shredded done");
      setTimeout(() => {
        const categoryId = entry?.category_id;
        EntryModel.deleteEntry(entry?.id).then(() => {
          router.push(`/category/${categoryId}`);
        });
        }, 3000);
    }, 3000);
  };

  const updateEntry = async () => {};

  return (
    <div className="entriesWrapper" data-category={entry?.category?.id}>
      <div className="emoji">{entry?.category?.emoji}</div>
      <div className="header">
        <h1>{entry?.value}</h1>
      </div>
      <div className={`singleEntry ${deletionState}`}>
        <div className="images">
          <div className="image">
            <img
              src={`https://image.tmdb.org/t/p/w500/${entry?.image}`}
              alt=""
            />
          </div>
          <div className="imageShredded">
            {[...Array(10)].map((e, i) => (
              <img
                key={i}
                src={`https://image.tmdb.org/t/p/w500/${entry?.image}`}
                alt=""
                style={{
                  // @ts-ignore
                  "--offset": i * 10.1 + "%",
                  "--timeOffset": Math.random() * 0.1 + "s",
                }}
              />
            ))}
          </div>
        </div>
        <div className="pageActions">
          <Link href={`/category/${entry?.category?.id}`} className="button">
            ⬅️
          </Link>
          <a href={entry?.url} target="_blank" className="button">
            🔗
          </a>
          <div className="button" onClick={openModal}>
            🗑️
          </div>
        </div>
      </div>
      <CSSTransition
                in={showModal}
                timeout={200}
                unmountOnExit
            >
                <Modal onClose={() => setShowModal(false)} onDelete={() => deleteEntry()} itemName={entry?.value} type="entry"  />
            </CSSTransition>

    </div>
  );
}
