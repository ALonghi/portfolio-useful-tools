
interface InputFormProps {
    label: string,
    type: string,
    name: string,
    placeholder: string,
    value: number,
    updateValue: Function
}


const InputForm: React.VFC<InputFormProps> = (props) => {
    return (
      <div className={`mx-2 `}>
        <label htmlFor={props.name} className=" mb-2 block text-sm font-medium text-gray-700">
          {props.label}
        </label>
        <div className={`mt-1 `}>
          <input
            type={props.type}
            name={props.name}
            id={props.name}
            defaultValue={props.value}
            className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block pl-3 pr-10 py-2
             w-full sm:text-sm border-gray-300 rounded-md`}
            placeholder={props.placeholder}
            onChange={(e) => props.updateValue(e.target.valueAsNumber)}
          />
        </div>
      </div>
    )
  }

  export default InputForm