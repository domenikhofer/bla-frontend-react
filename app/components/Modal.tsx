import  { createPortal } from "react-dom"

// TODO: add Name of Category
export default function Modal(props : any) {
    return createPortal (
        <div className="modal visible">
            <div className="content">
                <h2>Are you sure you want to delete the category «»?</h2>
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