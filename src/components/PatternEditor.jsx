const PatternEditor = ({ label }) => {
    return (
        <div className="patternEditor" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
            <label htmlFor="exampleFormControlTextarea1" className="form-label">{ label }</label>
            <div id="editor" />
            <div id="output" />
        </div>
    );
}

export default PatternEditor;