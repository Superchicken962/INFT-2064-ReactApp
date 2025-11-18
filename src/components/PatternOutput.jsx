const PatternEditor = ({ label, outputRef }) => {
    return (
        <div className="patternEditor" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
            { label ? <label htmlFor="exampleFormControlTextarea1" className="form-label">{ label }</label> : "" }
            <div id="editor" ref={ outputRef } />
            <div id="output" />
        </div>
    );
}

export default PatternEditor;