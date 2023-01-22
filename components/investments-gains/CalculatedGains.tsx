import {CalculatedResult} from "@pages/index";
import CalculationFacility from "@utils/CalculationFacility";

interface CalculatedGainsProps {
    calculated: CalculatedResult
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
                            <p className={`font-medium text-green-500`}>+ {(calculated.totalValue * 100 / calculated.totalInvested).toFixed()} %</p>
                        </div>
                    </li>
                </ul>
                <div className="relative my-6">
                    <div className="w-full border-t border-gray-200"/>
                </div>
                <div>
                    <h3 className={`my-4 text-xl font-bold text-gray-900 tracking-tight sm:text-2xl`}>Yearly
                        Details</h3>
                    <ul>
                        {[...Array(calculated.years)].map((x, index) =>
                            <li key={index}>
                                <div className={infoDivClasses}>
                                    <p>In year {index + 1} gained</p>
                                    <p>€ {calculated.history.find(year => year.year === index + 1).yearGain.toLocaleString(`it-IT`)}</p>
                                </div>
                            </li>
                        )}
                        <li>
                            <div className={infoDivClasses}>
                                <p className={`w-8/12`}>Additional year on plan ({calculated.years + 1}th) </p>
                                <p>€ {CalculationFacility.calculate(
                                    0,
                                    calculated.interestRate,
                                    `Yearly`,
                                    calculated.totalValue,
                                    1
                                ).amountGained.toLocaleString(`it-IT`)
                                }</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default CalculatedGains