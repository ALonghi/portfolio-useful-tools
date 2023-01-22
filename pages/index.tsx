import InputForm from '@components/shared/InputForm';
import SelectBox from "@components/shared/SelectBox";
import InputFormWithTail from "@components/investments-gains/InputFormWithTail";
import {useState} from "react";
import CalculatedGains from "@components/investments-gains/CalculatedGains";
import CalculationFacility from "@utils/CalculationFacility";

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

    const [frequency, setFrequency] = useState<frequency>(`Monthly`)
    const [startCapital, setStartCapital] = useState<number>()
    const [years, setYears] = useState<number>()
    const [amountToInvest, setAmountToInvest] = useState<number>()
    const [interestRate, setInterestRate] = useState<number>(0)
    const [wasCalculated, setWasCalculated] = useState<boolean>(false)
    const [calculated, setCalculated] = useState<CalculatedResult>({} as CalculatedResult)

    const calculate = () => {
        const result = CalculationFacility.calculate(
            startCapital || 0,
            interestRate,
            frequency,
            amountToInvest,
            years)
        setCalculated(result)
        setWasCalculated(true)
    }

    return (<>
            <div
                className="bg-white w-full min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8 bg-gray-100">
                <div className={`w-11/12 mx-auto`}>
                    <main className="sm:flex">
                        <div className='max-w-xs'>
                            <p className="text-4xl font-bold text-indigo-600 sm:text-5xl">Calculate your investment
                                gains</p>
                            <p className={` bottom-10 mt-4 text-gray-400`}>v {process.env.NEXT_PUBLIC_APP_VERSION}</p>
                        </div>

                        <div className="sm:ml-6 w-max">
                            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                                <div className="block mt-2">
                                    <InputForm name={`startCapital`} label={`Initial capital to start with`}
                                               type={`number`} placeholder={`5.000`}
                                               value={startCapital} updateValue={setStartCapital}/>
                                </div>

                                <h1 className="my-4 text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">Amount
                                    to invest</h1>
                                <div className={`flex flex-row`}>
                                    <SelectBox name={`frequency`} label={`Deposit Frequency`}
                                               options={[`Monthly`, `Yearly`]}
                                               defaultValue={frequency} updateSelection={setFrequency}/>
                                    <InputForm name={`amount`} label={`Amount`} type={`number`} placeholder={`1000`}
                                               value={amountToInvest} updateValue={setAmountToInvest}/>
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
