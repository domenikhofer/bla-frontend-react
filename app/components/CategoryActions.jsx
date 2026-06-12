import { Link } from "next-view-transitions";
import { useState } from 'react'
import Modal from '../components/Modal'
import * as CategoryModel from '../libs/categoryModel'


export default function CategoryActions(props) {

    const [showModal, setShowModal] = useState(false);

    const openModal = async () => {
        setShowModal(true);
    }

    const deleteCategory = async () => {
        await CategoryModel.deleteCategory(props.category.id)
        await CategoryModel.getCategories().then((c) => {
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
           
                <Modal open={showModal} onClose={() => setShowModal(false)} onDelete={() => deleteCategory()} itemName={props.category.name} type="category"  />
           

        </>
    )
}