import Link from 'next/link'
import { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import Modal from '@/app/components/Modal'

interface Props {
    category: Category,
    className: string
}

export default function CategoryActions(props: Props) {

    const [showModal, setShowModal] = useState(false);

    const openModal = async () => {
        setShowModal(true);
    }

    const deleteCategory = async () => {
        console.log('delete category', props.category.id);
        //TODO : finish delete logic
        setShowModal(false);
    }

    return (
        <>
            <div className={`actions ${props.className}`}>
                <Link href={`/category/edit/${props.category.id}`} className="button">✏️</Link>
                <div className="button" onClick={openModal}>🗑️</div>
            </div >
            <CSSTransition
                in={showModal}
                timeout={200}
                unmountOnExit
            >
                <Modal onClose={() => setShowModal(false)} onDelete={() => deleteCategory()} categoryName={props.category.name}  />
            </CSSTransition>

        </>
    )
}