import  { createPortal } from "react-dom"

export default function Modal(props) {
    return createPortal (
        <div className={`modal ${props.open && 'open'}`}>
            <div className="content">
                <h2>Are you sure you want to delete «{props.itemName}»?</h2>
                {props.type == "category" && <h3>All entries in this category will also be deleted!</h3>}
                <div className="actions">
                    <div className="button" onClick={props.onDelete}>🗑️</div>
                    <div className="button" onClick={props.onClose}>✖️</div>
                </div>
            </div>
        </div>,
        document.body
    )
}