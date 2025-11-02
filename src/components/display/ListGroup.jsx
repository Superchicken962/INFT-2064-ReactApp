const ListGroup = ({ maxHeight, children: items }) => {
    return (
        <>
            <div className="list-group" style={{ maxHeight, overflowY: 'auto' }}>
                { items }
            </div>
        </>
    )
}

export default ListGroup;