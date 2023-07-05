interface InputFormWithTailProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  tailText?: string;
  value: number;
  updateValue: Function;
  orientation?: "vertical" | "horizontal";
  fullWith?: boolean;
  children?: any;
}

const InputFormWithTail: React.FC<InputFormWithTailProps> = (props) => {
  return (
      <div
          className={`mx-2 w-full flex ${
              props.orientation === `horizontal`
                  ? `flex-row items-center`
                  : `flex-col`
          }  align-middle gap-x-8 gap-y-3`}
      >
        <div className={`flex items-center w-full`}>
          <label htmlFor={props.name} className="text-sm text-gray-700">
            {props.label}
          </label>
          {props.children || null}
        </div>
        <div
            className={`w-2/5 relative rounded-md shadow-sm ${
                props.fullWith ? `w-full` : `w-max`
            } flex justify-items-start items-center
            ${props.orientation === `horizontal` && `ml-auto mr-2`}`}
        >
          <input
              type={props.type}
              name={props.name}
              id={props.name}
              className="focus:ring-indigo-500 focus:border-indigo-500 block z-20 pl-3 pr-10 py-2
                    sm:text-sm border-gray-300 rounded-md pl-8 w-full"
              placeholder={props.placeholder}
              aria-describedby="price-currency"
              onChange={(e) => props.updateValue(e)}
          />
          {props.tailText && (
              <div
                  className="absolute inset-y-0 right-5 pr-3 flex items-center pointer-events-none w-fit overflow-visible">
            <span
                className="text-gray-500 sm:text-sm absolute z-40"
                id={props.name}
            >
              {props.tailText}
            </span>
              </div>
          )}
        </div>
      </div>
  );
};

export default InputFormWithTail;
