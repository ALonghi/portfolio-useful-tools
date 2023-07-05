import Utils from "@utils/Utils";

interface SelectMenuProps {
    label: string;
    values: string[];
    selectedValue?: any;
    id?: string;
    classes?: string;
    selectBoxClasses?: string;
    onSelectAction: Function;
}

const SelectMenu: React.FC<SelectMenuProps> = (props) => {
    return (
        <div className={props.classes ? props.classes : ``}>
            {props.label && (
                <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                >
                    {props.label}
                </label>
            )}
            <select
                id={props.id || props.label}
                name={props.id || props.label}
                className={`pl-3 pr-8 py-2 text-base border-gray-300  focus:ring-slate-600 
                focus:border-slate-600 sm:text-sm rounded-md !h-full
                ${props.selectBoxClasses ? props.selectBoxClasses : ``}`}
                value={Utils.getCapitalized(props.selectedValue || props.values[0])}
                onChange={(e) => props.onSelectAction(e.target.value?.toLowerCase())}
            >
                {props.values
                    .map((v) => Utils.getCapitalized(v))
                    .map((v, i) => (
                        <option key={i} value={v}>
                            {v}
                        </option>
                    ))}
            </select>
        </div>
    );
};

export default SelectMenu;
