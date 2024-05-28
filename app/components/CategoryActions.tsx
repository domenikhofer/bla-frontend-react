import Link from 'next/link'
import { useState } from 'react'
import Modal from './Modal'


export default function CategoryActions(props : any) {

    const [showModal, setShowModal] = useState(false);

    const openModal = async () => {
        setShowModal(true);
    }

    const deleteCategory = async () => {
        console.log('delete category', props.category.id); 
        //TODO : finish delete logic
        setShowModal(false);
    }
    // TODO: add Transition
    return (
        <>
        <div className={`actions ${props.className}`}>
            <Link href={`/category/edit/${props.category.id}`} className="button">✏️</Link>
            <div className="button" onClick={openModal}>🗑️</div>
        </div > 
        {showModal && (
        <Modal onClose={() => setShowModal(false)} onDelete={() => deleteCategory() } />
      )}
        </>
    )
}