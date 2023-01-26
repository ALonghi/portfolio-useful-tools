import IMovement from "@model/income/IMovement";
import React, {useState} from "react";
import Utils from "@utils/Utils";

interface OverviewProps {
    movements: IMovement[],
    classes?: string
}

const titlesClasses = `mt-2 text-base text-gray-900`
const paragraphClasses = `mt-2 text-base text-gray-700 font-light`
const yearsToShow = [2, 3, 5, 10]

const Overview: React.FC<OverviewProps> = (props) => {
    const totalIncome: number = props.movements
        ?.filter(m => m.movementType === 'income')
        ?.filter(m => !m.isInactive)
        ?.map(m => m.frequency === 'yearly'
            ? m.amount / 12
            : m.amount)
        ?.reduce((p: number, c: number) => p + c, 0) || 0
    const totalInvestments: number = props.movements
        ?.filter(m => m.movementType === 'investment')
        ?.filter(m => !m.isInactive)
        ?.map(m => m.frequency === 'yearly'
            ? m.amount / 12
            : m.amount)
        ?.reduce((p: number, c: number) => p + c, 0) || 0
    const totalRequiredExpenses: number = props.movements
        ?.filter(m => m.movementType === 'expense' && m.reason === 'necessary')
        ?.filter(m => !m.isInactive)
        ?.map(m => m.frequency === 'yearly'
            ? m.amount / 12
            : m.amount)
        ?.reduce((p: number, c: number) => p + c, 0) || 0

    const totalAdditionalExpenses: number = props.movements
        ?.filter(m => m.movementType === 'expense' && m.reason !== 'necessary')
        ?.filter(m => !m.isInactive)
        ?.map(m => m.frequency === 'yearly'
            ? m.amount / 12
            : m.amount)
        ?.reduce((p: number, c: number) => p + c, 0) || 0

    const monthlyGain: number = totalIncome - totalInvestments - totalRequiredExpenses - totalAdditionalExpenses

    const [initialCapital, setInitialCapital] = useState<number>(0)


    return (
        <div className={props.classes ? props.classes : ``}>

            <div className={`mt-12 flex items-center `}>
                <h2 className={`font-light text-xl my-auto`}>1 Month gain</h2>
                <p className={`ml-4 mt-auto text-base font-normal 
                ${totalIncome > 0 ? `text-emerald-500` : `text-red-500`}`}>
                    {totalIncome > 0 ? `+` : ``} {Utils.formatAmount(monthlyGain)} CHF</p>
                <p className={`ml-2 mt-auto text-base font-light 
                ${totalIncome + initialCapital > 0 ? `text-emerald-600` : `text-red-500`}`}>
                    ({Utils.formatAmount(initialCapital + parseInt((monthlyGain).toFixed(0)))})</p>
            </div>
            <div className={`mt-2 flex items-center `}>
                <h2 className={`font-light text-xl my-auto`}>3 months gain</h2>
                <p className={`ml-4 mt-auto text-base font-normal 
                ${totalIncome > 0 ? `text-emerald-500` : `text-red-500`}`}>
                    {totalIncome > 0 ? `+` : ``} {Utils.formatAmount(parseInt((monthlyGain * 3).toFixed(0)))} CHF</p>
                <p className={`ml-2 mt-auto text-base font-light 
                ${totalIncome + initialCapital > 0 ? `text-emerald-600` : `text-red-500`}`}>
                    ({Utils.formatAmount(initialCapital + parseInt((monthlyGain * 3).toFixed(0)))})</p>
            </div>
            <div className={`mt-2 flex items-center `}>
                <h2 className={`font-light text-xl my-auto`}>6 months gain</h2>
                <p className={`ml-4 mt-auto text-base font-normal 
                ${totalIncome > 0 ? `text-emerald-500` : `text-red-500`}`}>
                    {totalIncome > 0 ? `+` : ``} {Utils.formatAmount(parseInt((monthlyGain * 6).toFixed(0)))} CHF</p>
                <p className={`ml-2 mt-auto text-base font-light 
                ${totalIncome + initialCapital > 0 ? `text-emerald-600` : `text-red-500`}`}>
                    ({Utils.formatAmount(initialCapital + parseInt((monthlyGain * 6).toFixed(0)))})</p>
            </div>
            <div className={`mt-2 flex items-center `}>
                <h2 className={`font-light text-xl my-auto`}>12 months gain</h2>
                <p className={`ml-4 mt-auto text-base font-normal 
                ${totalIncome > 0 ? `text-emerald-500` : `text-red-500`}`}>
                    {totalIncome > 0 ? `+` : ``} {Utils.formatAmount(parseInt((monthlyGain * 12).toFixed(0)))} CHF</p>
                <p className={`ml-2 mt-auto text-base font-light 
                ${totalIncome + initialCapital > 0 ? `text-emerald-600` : `text-red-500`}`}>
                    ({Utils.formatAmount(initialCapital + parseInt((monthlyGain * 12).toFixed(0)))})</p>
            </div>
            {yearsToShow.map((years, i) =>
                <div className={`mt-2 flex items-center `} key={i}>
                    <h2 className={`font-light text-xl my-auto`}>{years} years gain</h2>
                    <p className={`ml-4 mt-auto text-base font-normal 
                ${totalIncome > 0 ? `text-emerald-500` : `text-red-500`}`}>
                        {totalIncome > 0 ? `+` : ``} {Utils.formatAmount(parseInt((monthlyGain * 12 * years).toFixed(0)))} CHF</p>
                    <p className={`ml-2 mt-auto text-base font-light 
                ${totalIncome + initialCapital > 0 ? `text-emerald-600` : `text-red-500`}`}>
                        ({Utils.formatAmount(initialCapital + parseInt((monthlyGain * 12 * years).toFixed(0)))})</p>
                </div>
            )}
            <div className={`mt-3.5 flex items-start flex-col`}>
                <h2 className={`font-light text-xl my-auto`}>Initial Capital</h2>
                <input
                    id="amount"
                    name="amount"
                    type="number"
                    onChange={(e) => setInitialCapital(e.target.valueAsNumber)}
                    className={`my-2 appearance-none block min-w-fit px-3 py-2 border border-gray-300 rounded-md 
                                                  shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 
                                                  focus:border-emerald-500 sm:text-sm font-light`}
                />
            </div>


            <div className={`mt-12 mb-4 `}>
                <h2 className={`text-xl my-auto block mb-2`}>Income </h2>
                <div className={`flex`}>
                    <h2 className={`font-light text-xl my-auto`}>Monthly</h2>
                    <p className={`ml-4 mt-auto text-base font-bold text-indigo-600`}>{Utils.formatAmount(totalIncome)} CHF</p>
                </div>
                <div className={`flex`}>
                    <h2 className={`font-light text-xl my-auto`}>Yearly</h2>
                    <p className={`ml-4 mt-auto text-base font-bold text-indigo-600`}>{Utils.formatAmount(totalIncome * 12)} CHF</p>
                </div>
            </div>

            <div className={`my-4 `}>
                <div className={`flex items-center mb-2`}>
                    <h2 className={`text-xl my-auto block`}>Investments </h2>
                    <p className={`font-light text-xl ml-4 `}>{Utils.formatAmount(parseInt((totalInvestments * 100 / totalIncome).toFixed(0)))} %</p>
                </div>
                <div className={`flex`}>
                    <h2 className={`font-light text-xl my-auto`}>Monthly</h2>
                    <p className={`ml-4 mt-auto text-base font-bold text-indigo-600`}>{Utils.formatAmount(totalInvestments)} CHF</p>
                </div>
                <div className={`flex`}>
                    <h2 className={`font-light text-xl my-auto`}>Yearly</h2>
                    <p className={`ml-4 mt-auto text-base font-bold text-indigo-600`}>{Utils.formatAmount(totalInvestments * 12)} CHF</p>
                </div>
            </div>

            <div className={`my-4 `}>
                <div className={`flex items-center mb-2`}>
                    <h2 className={`text-xl my-auto block `}>Expenses </h2>
                    <p className={`my-auto font-light text-xl ml-3 `}>
                        {Utils.formatAmount(parseInt(((totalRequiredExpenses + totalAdditionalExpenses) * 100 / totalIncome).toFixed(0)))}%
                    </p>
                </div>
                <div className={`flex items-center mb-2`}>
                    <h2 className={`my-auto font-normal text-xl`}>Necessary</h2>
                    <p className={`ml-3 my-auto text-sm font-light text-gray-600`}>
                        {Utils.formatAmount(parseInt((totalRequiredExpenses * 100 / totalIncome).toFixed(0)))} %
                    </p>
                </div>
                <div className={`flex items-center mb-2`}>
                    <h2 className={`font-light text-xl`}>Monthly</h2>
                    <p className={`ml-4 text-base font-bold text-indigo-600`}>{Utils.formatAmount(totalRequiredExpenses)} CHF</p>
                </div>
                <div className={`flex`}>
                    <h2 className={`font-light text-xl my-auto`}>Yearly</h2>
                    <p className={`ml-4 mt-auto text-base font-bold text-indigo-600`}>{Utils.formatAmount(totalRequiredExpenses * 12)} CHF</p>
                </div>
                <div className={`flex items-center my-2`}>
                    <h2 className={`my-auto font-normal text-xl `}>Additional</h2>
                    <p className={`ml-3 my-auto text-sm font-light text-gray-600`}>
                        {Utils.formatAmount(parseInt((totalAdditionalExpenses * 100 / totalIncome).toFixed(0)))} %
                    </p>
                </div>
                <div className={`flex`}>
                    <h2 className={`font-light text-xl my-auto`}>Monthly</h2>
                    <p className={`ml-4 mt-auto text-base font-bold text-indigo-600`}>{Utils.formatAmount(totalAdditionalExpenses)} CHF</p>
                    <p className={`ml-3 mt-auto text-sm font-light text-gray-600`}>({Utils.formatAmount(totalAdditionalExpenses / 4)} weekly)</p>
                </div>
                <div className={`flex mb-2`}>
                    <h2 className={`font-light text-xl my-auto`}>Yearly</h2>
                    <p className={`ml-4 mt-auto text-base font-bold text-indigo-600`}>{Utils.formatAmount(totalAdditionalExpenses * 12)} CHF</p>
                </div>
            </div>


        </div>
    )
}

export default Overview