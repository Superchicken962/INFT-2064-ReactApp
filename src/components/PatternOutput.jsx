const PatternEditor = ({ label, outputRef }) => {
    return (
        <div className="patternEditor" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
            { label ? <label htmlFor="exampleFormControlTextarea1" className="form-label">{ label }</label> : "" }
            <div id="editor" />
            <div id="output" ref={ outputRef }/>
        </div>
    );
}

export default PatternEditor;