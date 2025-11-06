const ListGroupItem = ({ children: content, id, active, onClick }) => {
    return (
        <>
            <button
                type="button"
                id={ id }
                className={`list-group-item list-group-item-action ${active ? "active" : ""}`}
                aria-current={ active ? "true" : "false" }
                onClick={ onClick }
            >
                { content }
            </button>
        </>
    )
}

export default ListGroupItem;