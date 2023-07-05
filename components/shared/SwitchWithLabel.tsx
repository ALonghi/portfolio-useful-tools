import {Switch} from "@headlessui/react";
import Utils from "@utils/Utils";

interface SwitchProps {
    label: string;
    updateSelection: Function;
    enabled?: boolean;
    classes?: string;
}

const SwitchWithLabel: React.FC<SwitchProps> = (props) => {
    return (
        <div
            className={`inline-flex ${Utils.classNames(
                props.classes
            )} gap-x-5 min-w-[13rem]`}
        >
            <label
                htmlFor="location"
                className=" mb-2 block text-sm font-medium text-gray-700"
            >
                {props.label}
            </label>
            <Switch
                checked={props.enabled}
                onChange={(e) => props.updateSelection(e)}
                className={Utils.classNames(
                    props.enabled ? "bg-indigo-600" : "bg-gray-200",
                    "ml-auto relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                )}
            >
                <span className="sr-only">Use setting</span>
                <span
                    aria-hidden="true"
                    className={Utils.classNames(
                        props.enabled ? "translate-x-5" : "translate-x-0",
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    )}
                />
            </Switch>
        </div>
    );
};

export default SwitchWithLabel;
