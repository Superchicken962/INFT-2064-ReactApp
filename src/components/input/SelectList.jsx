const SelectList = ({ id, label, defaultOption, options, value, onChange }) => {
    return (
        <>
            <label htmlFor={ id } className="form-label">{ label }</label>
            <select className="form-select" id={ id } onChange={ onChange } defaultValue={ value }>
                <option>{ defaultOption }</option>

                { options?.map(opt =>
                    <option key={ opt?.value ?? opt } value={ opt?.value ?? opt }>{ opt?.name ?? opt }</option>
                )}
            </select>
        </>
    );
}

export default SelectList;