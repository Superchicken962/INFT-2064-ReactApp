const Alert = ({ onClose, children }) => {
    return (
        <>
            <div className="alert alert-danger alert-dismissible fade show align-center" role="alert">
                { children }
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={ onClose }></button>
            </div>
        </>
    );
}

export default Alert;