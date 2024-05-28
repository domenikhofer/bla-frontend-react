import  { createPortal } from "react-dom"

interface Props {
    onClose: () => void,
    onDelete: () => void,
    categoryName: string
}

// TODO: add Name of Category
export default function Modal(props : Props) {
    return createPortal (
        <div className="modal">
            <div className="content">
                <h2>Are you sure you want to delete the category «{props.categoryName}»?</h2>
                <h3>All subcategories and their entries will also be deleted!</h3>
                <div className="actions">
                    <div className="button" onClick={props.onDelete}>🗑️</div>
                    <div className="button" onClick={props.onClose}>✖️</div>
                </div>
            </div>
        </div>,
        document.body
    )
}