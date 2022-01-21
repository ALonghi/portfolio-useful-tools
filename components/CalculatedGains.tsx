import {Result} from "../pages";

interface CalculatedGainsProps {
    calculated: Result
}

const infoDivClasses = `flex flex-row justify-between w-10/12 font-light my-1`

const CalculatedGains: React.VFC<CalculatedGainsProps> = ({calculated}) => {

    return (
        <div className="mt-10 bg-white overflow-hidden shadow rounded-lg">
            <div className="px-6 py-8 sm:p-6">
                <h3 className={`my-4 text-xl font-bold text-gray-900 tracking-tight sm:text-2xl`}>After {calculated.years} Years</h3>
                <ul>
                    <li>
                        <div className={infoDivClasses}>
                            <p>Amount Invested</p>
                            <p>€ {calculated.totalInvested.toLocaleString(`it-IT`)}</p>
                        </div>
                    </li>
                    <li>
                        <div className={infoDivClasses}>
                            <p>Amount Returned</p>
                            <p>€ {calculated.totalValue.toLocaleString(`it-IT`)}</p>
                        </div>
                    </li>
                    <li>
                        <div className={infoDivClasses}>
                            <p>Total Profit</p>
                            <p>€ {calculated.amountGained.toLocaleString(`it-IT`)}</p>
                        </div>
                    </li>

                    <li>
                        <div className={infoDivClasses}>
                            <p>Increment of capital</p>
                            <p>{(calculated.amountGained * 100 / calculated.totalInvested).toFixed()} %</p>
                        </div>
                    </li>
                </ul>
                {/*<div className="relative my-6">*/}
                {/*        <div className="w-full border-t border-gray-200" />*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    { [...Array(calculated.years)].map((x, y) => {*/}
                {/*        <p>In year</p>*/}
                {/*    })}*/}
                {/*</div>*/}
            </div>

        </div>
    )
}

export default CalculatedGains