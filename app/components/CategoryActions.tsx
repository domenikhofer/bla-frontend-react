import { Link } from "next-view-transitions";
import { useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import Modal from '@/app/components/Modal'
import * as CategoryModel from '@/app/libs/categoryModel'

interface Props {
    category: Category,
    className: string,
    categories: Category[],
    setCategories: Function
}

export default function CategoryActions(props: Props) {

    const [showModal, setShowModal] = useState(false);

    const openModal = async () => {
        setShowModal(true);
    }

    const deleteCategory = async () => {
        await CategoryModel.deleteCategory(props.category.id)
        await CategoryModel.getCategories().then((c: Category[]) => {
            props.setCategories(c)
        })
        setShowModal(false);
    }

    return (
        <>
            <div className={`actions ${props.className}`}>
                <Link href={`/category/edit/${props.category.id}`} className="button">✏️</Link>
                <div className={`button ${props.category.subcategories != null && props.category.subcategories.length != 0 ? 'invisible' : ''}`} onClick={openModal}>🗑️</div>
            </div >
            <CSSTransition
                in={showModal}
                timeout={200}
                unmountOnExit
            >
                <Modal onClose={() => setShowModal(false)} onDelete={() => deleteCategory()} itemName={props.category.name} type="category"  />
            </CSSTransition>

        </>
    )
}