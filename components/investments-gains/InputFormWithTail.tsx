interface InputFormWithTailProps {
    label: string,
    type: string,
    name: string,
    placeholder: string,
    tailText: string,
    value: number,
    updateValue: Function
}


const InputFormWithTail: React.VFC<InputFormWithTailProps> = (props) => {
    return (
        <div className={`mx-2 `}>
            <label htmlFor={props.name} className=" mb-2 block text-sm font-medium text-gray-700">
                {props.label}
            </label>
            <div className="w-2/5 mt-1 relative rounded-md shadow-sm w-max flex flex-row justify-items-start items-center">
                <input
                    type={props.type}
                    name={props.name}
                    id={props.name}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block z-20 pl-3 pr-10 py-2 sm:text-sm border-gray-300 rounded-md"
                    placeholder={props.placeholder}
                    aria-describedby="price-currency"
                    onChange={(e) => props.updateValue(e.target.valueAsNumber)}
                />
                <div className="absolute inset-y-0 right-5 pr-3 flex items-center pointer-events-none w-max overflow-visible">
                    <span className="text-gray-500 sm:text-sm absolute z-40" id={props.name}>{props.tailText}</span>
                </div>
            </div>
        </div>
    )
}

export default InputFormWithTail