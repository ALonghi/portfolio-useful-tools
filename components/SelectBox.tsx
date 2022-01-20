interface SelectBoxProps {
    label: string,
    name: string,
    options: string[],
    defaultValue: string,
    updateSelection: Function
}


const SelectBox: React.VFC<SelectBoxProps> = (props) => {
    return (
        <div className={`mx-2 w-full`}>
            <label htmlFor="location" className=" mb-2 block text-sm font-medium text-gray-700">
                {props.label}
            </label>
            <select
                id={props.name}
                name={props.name}
                className={`mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md`}
                defaultValue={props.defaultValue}
                onChange={(e) => props.updateSelection(e.target.value)}
            >
                {props.options.map((option, index) =>
                    <option key={index}>{option}</option>
                )}
            </select>
        </div>
    )
}

export default SelectBox