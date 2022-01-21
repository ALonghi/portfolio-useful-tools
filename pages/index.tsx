import InputForm from '../components/InputForm';
import SelectBox from "../components/SelectBox";
import InputFormWithTail from "../components/InputFormWithTail";
import {useState} from "react";
import CalculatedGains from "../components/CalculatedGains";

export type frequency = `Monthly` | `Yearly`

export interface Result {
    yearlyInvested: number,
    totalInvested: number,
    totalValue: number
    amountGained: number,
    years: number
}

const IndexPage = () => {

    const [frequency, setFrequency] = useState<frequency>(`Monthly`)
    const [years, setYears] = useState<number>()
    const [investedAmount, setInvestedAmount] = useState<number>()
    const [interestRate, setInterestRate] = useState<number>(0)
    const [calculated, setCalculated] = useState<Result>({} as Result)

    const calculate = () => {
        const addInterest = (currentValueInvested) =>
            currentValueInvested * interestRate / 100

        let total: number = 0
        const yearlyInvestment: number = frequency === `Yearly`
            ? investedAmount
            : investedAmount * 12

        for (let i: number = 1; i <= years; i++) {
            const amountToAdd = addInterest(total + yearlyInvestment)
            total += amountToAdd + yearlyInvestment
        }
        const result: Result = {
            yearlyInvested: yearlyInvestment,
            totalInvested: yearlyInvestment * years,
            totalValue: parseInt((total).toFixed()),
            amountGained: parseInt((total - (yearlyInvestment * years)).toFixed()),
            years: years
        }
        setCalculated(result)
    }

    return (<>
            <div
                className="bg-white w-full min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8 bg-gray-100">
                <div className={`w-11/12 mx-auto`}>
                    <main className="sm:flex">
                        <p className="text-4xl font-bold text-indigo-600 sm:text-5xl">Calculate your investment
                            gains</p>
                        <div className="sm:ml-6">
                            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                                <h1 className="my-4 text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">Amounts
                                    to invest</h1>
                                <div className={`flex flex-row`}>
                                    <SelectBox name={`frequency`} label={`Deposit Frequency`}
                                               options={[`Monthly`, `Yearly`]}
                                               defaultValue={frequency} updateSelection={setFrequency}/>
                                    <InputForm name={`amount`} label={`Amount`} type={`number`} placeholder={`1000`}
                                               value={investedAmount} updateValue={setInvestedAmount}/>
                                </div>
                                <div className={`mt-5`}>
                                    <h1 className="my-4 text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">Investment
                                        details</h1>
                                    <InputFormWithTail name={`rate`} label={`Yearly interest rate`} type={`number`}
                                                       placeholder={`7`} tailText={`%`}
                                                       value={interestRate} updateValue={setInterestRate}/>
                                </div>
                                <div className={`mt-5`}>
                                    <InputForm name={`years`} label={`Years to keep the money invested`} type={`number`}
                                               placeholder={`10`}
                                               value={years} updateValue={setYears}/>
                                </div>
                                <button
                                    type="button"
                                    className="mt-8 ml-2 inline-flex items-center px-3 py-2 border border-transparent text-base
                                 font-light rounded-md shadow-sm text-white bg-indigo-600
                                 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={calculate}
                                >
                                    Calculate
                                </button>

                                {Object.keys(calculated).length > 0 &&
                                    <CalculatedGains calculated={calculated}/>
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
