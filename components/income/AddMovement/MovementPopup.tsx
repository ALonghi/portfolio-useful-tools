import {XMarkIcon} from "@heroicons/react/24/outline";
import IMovement from "@model/income/IMovement";
import MovementService from "@service/movementsService";
import {userStateSelector} from "@context/redux/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {createNotification, ToastData} from "@context/redux/UI/UISlice";
import {nanoid} from "nanoid";
import SelectMenu from "@components/shared/SelectMenu";
import React, {Fragment, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";

interface AddMovementProps {
    showPopup: boolean;
    hidePopup?: Function;
    toggleRequestSent: Function;
    classes?: string;
    movement?: IMovement;
}

const MovementPopup: React.VFC<AddMovementProps> = ({
                                                        showPopup,
                                                        hidePopup,
                                                        toggleRequestSent,
                                                        classes,
                                                        movement,
                                                    }) => {
    const [movementData, setMovementData] = useState<Partial<IMovement>>(
        movement
            ? movement
            : {
                movementType: "expense",
                reason: "necessary",
                frequency: "monthly",
            }
    );

    const userState = useSelector(userStateSelector);
    const dispatch = useDispatch();

    const updateMovement = async () => {
        try {
            await MovementService.updateMovement(movementData);
            const notification: ToastData = {
                id: nanoid(16),
                details: `Movement "${movementData.name}" correctly updated `,
                type: `success`,
                hidden: false,
            };
            createNotification(dispatch, notification);
            hidePopup();
            toggleRequestSent();
        } catch (e) {
            const notification: ToastData = {
                id: nanoid(16),
                details: `Problem occurred while updating movement: ${e.message || e}`,
                type: `error`,
                hidden: false,
            };
            createNotification(dispatch, notification);
        }
    };
    const addMovement = async () => {
        try {
            await MovementService.addMovement(movementData, userState.userId);
            const notification: ToastData = {
                id: nanoid(16),
                details: `Movement "${movementData.name}" correctly added `,
                type: `success`,
                hidden: false,
            };
            createNotification(dispatch, notification);
            hidePopup();
            toggleRequestSent();
        } catch (e) {
            const notification: ToastData = {
                id: nanoid(16),
                details: `Problem occurred while adding movement: ${e.message || e}`,
                type: `error`,
                hidden: false,
            };
            createNotification(dispatch, notification);
        }
    };

    const updateDetails = (propertyName: string, value: any) => {
        const data = {
            ...movementData,
            [propertyName]: value,
        } as Partial<IMovement>;
        setMovementData(() => data);
    };

    return (
        <>
            <Transition.Root show={showPopup} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => hidePopup()}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex h-full m-auto justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel
                                    className="relative w-full transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4
                                    items-center text-left shadow-xl transition-all m-auto lg:w-4/12 sm:w-11/12 sm:p-8"
                                >
                                    <div>
                                        <div className="mx-auto w-full max-w-sm lg:w-96">
                                            <button
                                                type="button"
                                                className="-m-2 p-2 text-gray-400 hover:text-gray-500 absolute top-5 right-5"
                                                onClick={() => hidePopup()}
                                            >
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                            </button>
                                            <div>
                                                <h2 className="mt-3 text-2xl font-medium text-gray-900 text-center">
                                                    {movement ? `Edit movement` : `New Movement`}
                                                </h2>
                                            </div>

                                            <div className="mt-8">
                                                <div className="mt-6">
                                                    <form action="#" method="POST" className="space-y-6">
                                                        <div>
                                                            <label
                                                                htmlFor="email"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                Name
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    id="name"
                                                                    name="name"
                                                                    type="name"
                                                                    onChange={(e) =>
                                                                        updateDetails(`name`, e.target.value)
                                                                    }
                                                                    required
                                                                    value={movementData.name || ""}
                                                                    className={`appearance-none block w-full px-3 py-2 
                                                  border border-gray-300 rounded-md shadow-sm 
                                                  placeholder-gray-400 focus:outline-none 
                                                  focus:ring-emerald-500 focus:border-emerald-500 
                                                  sm:text-sm `}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-1">
                                                            <label
                                                                htmlFor="password"
                                                                className="block text-sm font-medium text-gray-700"
                                                            >
                                                                Amount
                                                            </label>
                                                            <div className="mt-1">
                                                                <input
                                                                    id="amount"
                                                                    name="amount"
                                                                    type="number"
                                                                    value={movementData.amount || 0}
                                                                    onChange={(e) =>
                                                                        updateDetails(
                                                                            `amount`,
                                                                            e.target.valueAsNumber
                                                                        )
                                                                    }
                                                                    required
                                                                    className={`appearance-none block min-w-fit px-3 py-2 border border-gray-300 rounded-md 
                                                  shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
                                                  focus:border-emerald-500 sm:text-sm`}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-1">
                                                            <div className="mt-1">
                                                                <SelectMenu
                                                                    label={`Type`}
                                                                    values={["income", "expense", "investment"]}
                                                                    selectBoxClasses={`mt-2 `}
                                                                    selectedValue={movementData.movementType}
                                                                    onSelectAction={(value) =>
                                                                        updateDetails(`movementType`, value)
                                                                    }
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-1">
                                                            <div className="mt-1">
                                                                <SelectMenu
                                                                    label={`Frequency`}
                                                                    values={["monthly", "yearly"]}
                                                                    selectBoxClasses={`mt-2 `}
                                                                    selectedValue={movementData.frequency}
                                                                    onSelectAction={(value) =>
                                                                        updateDetails(`frequency`, value)
                                                                    }
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-1">
                                                            <div className="mt-1">
                                                                <SelectMenu
                                                                    label={`Reason`}
                                                                    values={["necessary", "additional"]}
                                                                    selectBoxClasses={`mt-2 `}
                                                                    selectedValue={movementData.reason}
                                                                    onSelectAction={(value) =>
                                                                        updateDetails(`reason`, value)
                                                                    }
                                                                />
                                                            </div>
                                                        </div>

                                                        <div></div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            onClick={() => {
                                                movement ? updateMovement() : addMovement();
                                            }}
                                            type="button"
                                            className="w-full flex justify-center py-2 px-4 border border-transparent
                                              rounded-md shadow-sm text-base font-medium text-white
                                              bg-indigo-500 hover:bg-indigo-600 focus:outline-none
                                              focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default MovementPopup;
