import React, {useEffect, useState} from "react";
import {userStateSelector} from "@context/redux/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {EyeIcon, EyeSlashIcon, PlusSmallIcon, XMarkIcon} from "@heroicons/react/24/outline";
import MovementPopup from "@components/income/AddMovement/MovementPopup";
import Overview from "@components/income/Overview";
import {movementStateSelector, updateMovements} from "@context/redux/movements/movementsSlice";
import {deleteMovementThunk, getMovementsThunk} from "@context/redux/movements/movementThunk";
import IMovement from "@model/income/IMovement";
import Utils from "@utils/Utils"
import MovementService from "@service/movementsService";
import {createNotification, ToastData} from "@context/redux/UI/UISlice";
import {nanoid} from "nanoid";
import logging from "@utils/logging";

export type frequency = `Monthly` | `Yearly`

export interface YearlyResult {
    year: number,
    currentInvestedValue: number
    yearGain: number,
    totalCapital: number
}

export interface CalculatedResult {
    yearlyInvested: number,
    totalInvested: number,
    totalValue: number
    amountGained: number,
    years: number,
    firstYearGain: number,
    additionalYearGain: number,
    history: YearlyResult[],
    interestRate: number
}

const IndexPage = () => {

    const userState = useSelector(userStateSelector)
    const movementsState = useSelector(movementStateSelector)
    const dispatch = useDispatch()

    const [showPopup, setShowPopup] = useState<boolean>(false)
    const [focusedMovementId, setFocusedMovementId] = useState<string | null>(null)

    const fetchMovements = (): void => {
        if (userState.userId) { // @ts-ignore
            dispatch(getMovementsThunk(userState.userId))
        }
    }

    useEffect(() => {
        if (userState.isAuthenticated && !movementsState.isAsync)
            fetchMovements()
    }, [userState.isAuthenticated])

    const toggleInactiveStatus = async (movement: IMovement) => {
        try {
            const partialUpdate = await MovementService.updateMovementStatus(movement.id, !movement.isInactive)
            dispatch(updateMovements(movementsState.movements.map(m =>
                m.id === movement.id
                    ? {...m, ...partialUpdate}
                    : m
            )))
            const notification: ToastData = {
                id: nanoid(16),
                details: `Movement status switched to inactive: ${partialUpdate.isInactive} `,
                type: `success`,
                hidden: false,
            }
            createNotification(dispatch, notification)
        } catch (e) {
            const errorMsg = `Error while updating movement status: ${e.message || e}`
            logging.error(errorMsg)
            const notification: ToastData = {
                id: nanoid(16),
                details: errorMsg,
                type: `error`,
                hidden: false,
            }
            createNotification(dispatch, notification)
        }
    }

    const deleteMovement = (movement: IMovement) => {
        // @ts-ignore
        dispatch(deleteMovementThunk(movement.id))
        const notification: ToastData = {
            id: nanoid(16),
            details: `Movement with name ${movement.name} deleted.`,
            type: `success`,
            hidden: false,
        }
        createNotification(dispatch, notification)

    }

    const focusMovement = (id: string) => {
        setFocusedMovementId(id)
        setShowPopup(true)
    }

    const movementList = (movs: IMovement[]) => <>
        {movs.map(m =>
            <div key={m.id}
                 className={`flex items-center justify-end gap-1.5 hover:bg-gray-200 py-2 px-4 w-full m-0 rounded-lg cursor-pointer`}>
                <div onClick={() => focusMovement(m.id)} className={`flex items-center justify-between w-full`}>

                    <div
                        className={`inline-flex max-w-[7rem] sm:max-w-full w-full text-left flex justify-start whitespace-nowrap 
                        overflow-y-clip `}>
                        <p className={`text-gray-800 w-full text-left truncate`}>
                            {Utils.getCapitalized(m.name)}
                        </p>
                    </div>
                    <div className={`ml-auto flex flex-row flex-1 flex-nowrap justify-end items-center min-w-fit mr-2`}>
                        <p className={`inline-flex  ml-4 text-gray-700`}>{Utils.formatAmount(m.amount)} CHF</p>
                        <p className={`inline-flex  ml-3 text-white ${m.reason === "necessary" ? "bg-blue-500" : "bg-yellow-400"} font-light
                text-xs rounded-full py-0.5 px-1.5`}>
                            {m.reason === "necessary" ? "N" : "A"}
                        </p>
                    </div>
                </div>
                <div onClick={() => toggleInactiveStatus(m)} className={`w-min sm:ml-8`}>
                    {m.isInactive
                        ? <EyeSlashIcon className={`cursor-pointer block opacity-40`} height={20}/>
                        : <EyeIcon className={`cursor-pointer block opacity-40`} height={20}/>
                    }
                </div>
                <XMarkIcon className={`cursor-pointer block opacity-40 ml-4`} height={20}
                           onClick={() => deleteMovement(m)}/>
            </div>
        )}
    </>

    const hidePopup = () => {
        setShowPopup(false)
        setFocusedMovementId(null)
    }

    return (<>
            <div
                className="bg-white w-full min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8 bg-gray-100">
                {showPopup && <MovementPopup
                    showPopup={showPopup} toggleRequestSent={() => fetchMovements()}
                    hidePopup={() => hidePopup()}
                    movement={movementsState?.movements?.find(m => m.id === focusedMovementId) || null}
                />}
                <div className={`w-full mx-auto`}>
                    <main className="sm:flex">
                        <div className='max-w-sm'>
                            <h2 className="text-4xl font-bold text-indigo-600 sm:text-5xl">Calculate your net
                                profit</h2>
                            <p className={` bottom-10 mt-4 text-gray-400`}>v {process.env.NEXT_PUBLIC_APP_VERSION}</p>
                            <Overview movements={movementsState.movements}/>
                        </div>

                        <div className="relative my-12 ">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-300"/>
                            </div>
                        </div>

                        <div className="sm:ml-6 w-full">
                            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                                <div className={`flex align-middle items-center justify-around`}>
                                    <div className={`flex items-center`}>
                                        <h1 className="my-4 text-2xl font-bold text-gray-800 tracking-tight sm:text-3xl">
                                            Income </h1>
                                        <p className={`ml-3 font-light text-base text-gray-700 w-max`}>(net monthly)</p>
                                    </div>
                                    <PlusSmallIcon fill={`rgb(50, 50, 50)`} height={30}
                                                   className={`ml-4 cursor-pointer`}
                                                   onClick={() => setShowPopup(true)}/>

                                </div>
                                {movementList(movementsState.movements
                                    ?.filter(m => m.movementType === 'income')
                                    ?.sort((a: IMovement, b: IMovement) => -1 * a.reason.localeCompare(b.reason))
                                )
                                }
                            </div>
                            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                                <div className={`flex align-middle items-center justify-around`}>
                                    <div className={`flex items-center`}>
                                        <h1 className="my-4 text-2xl font-bold text-gray-800 tracking-tight sm:text-3xl">
                                            Investments </h1>
                                        <p className={`ml-3 font-light text-base text-gray-700 w-max`}>(monthly)</p>
                                    </div>
                                    <PlusSmallIcon fill={`rgb(50, 50, 50)`} height={30}
                                                   className={`ml-4 cursor-pointer`}
                                                   onClick={() => setShowPopup(true)}/>

                                </div>
                                {movementList(movementsState.movements
                                    ?.filter(m => m.movementType === 'investment')
                                    ?.sort((a: IMovement, b: IMovement) => -1 * a.reason.localeCompare(b.reason))
                                )
                                }
                            </div>
                            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                                <div className={`flex align-middle items-center justify-around`}>
                                    <div className={`flex items-center`}>
                                        <h1 className="my-4 text-2xl font-bold text-gray-800 tracking-tight sm:text-3xl">
                                            Expenses </h1>
                                        <p className={`ml-3 font-light text-base text-gray-700 w-max`}>(monthly)</p>
                                    </div>
                                    <PlusSmallIcon fill={`rgb(50, 50, 50)`} height={30}
                                                   className={`ml-4 cursor-pointer`}
                                                   onClick={() => setShowPopup(true)}/>

                                </div>
                                {movementList(movementsState.movements
                                    ?.filter(m => m.movementType === 'expense')
                                    ?.map(m => m.frequency === 'yearly' ? {...m, amount: m.amount / 12} : m)
                                    ?.sort((a: IMovement, b: IMovement) => -1 * a.reason.localeCompare(b.reason))
                                )

                                }
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default IndexPage
