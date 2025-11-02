const PreprocessText = ({ label }) => {
    return (
        <div className="preprocessText">
            { label ? <label htmlFor="exampleFormControlTextarea1" className="form-label">{ label }</label> : "" }
            <textarea className="form-control" rows="15" id="proc" style={{ maxHeight: '50vh', overflowY: 'auto' }}></textarea>
        </div>
    );
}

export default PreprocessText;