const SelectList = ({ id, label, defaultOption, options, value, onChange }) => {
    // Use a wrapper method so we can call given listener + handle 'onSelect' for each option.
    const changeListener = (ev) => {
        // Call onChange if given.
        onChange?.(ev);

        // Check which option is selected, and call 'onSelect' if it has one.
        const selectedVal = ev.target.value;
        const opt = options?.find(opt => (opt?.value === selectedVal || opt === selectedVal));

        // If option was found, and there is an onSelect listener, call it!
        if (opt && typeof opt.onSelect === "function") {
            opt.onSelect(ev);
        }
    }

    return (
        <>
            <label htmlFor={ id } className="form-label">{ label }</label>
            <select className="form-select" id={ id } onChange={ changeListener } defaultValue={ value }>
                <option>{ defaultOption }</option>

                { options?.map(opt =>
                    <option key={ opt?.value ?? opt } value={ opt?.value ?? opt }>{ opt?.name ?? opt }</option>
                )}
            </select>
        </>
    );
}

export default SelectList;