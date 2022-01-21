import {CalculatedResult, frequency, YearlyResult} from "../pages";

export default class CalculationFacility {
    static addInterest = (currentValueInvested, interestRate): number =>
        currentValueInvested * interestRate / 100

    static calculate = (
        interestRate: number,
        frequency: frequency,
        amountToInvest: number,
        years: number): CalculatedResult => {

        let total: number = 0
        let history: YearlyResult[] = []
        const yearlyInvestment: number = frequency === `Yearly`
            ? amountToInvest
            : amountToInvest * 12

        for (let i: number = 1; i <= years; i++) {
            const amountToAdd = CalculationFacility.addInterest(total + yearlyInvestment, interestRate)
            const yearData: YearlyResult = {
                year: i,
                currentInvestedValue: total + yearlyInvestment,
                yearGain: parseInt((amountToAdd).toFixed()),
                totalCapital: parseInt((total + amountToAdd + yearlyInvestment).toFixed())
            }
            total += amountToAdd + yearlyInvestment
            history.push(yearData)
        }
        const result: CalculatedResult = {
            yearlyInvested: yearlyInvestment,
            totalInvested: yearlyInvestment * years,
            totalValue: parseInt((total).toFixed()),
            amountGained: parseInt((total - (yearlyInvestment * years)).toFixed()),
            years: years,
            firstYearGain: yearlyInvestment + CalculationFacility.addInterest(yearlyInvestment, interestRate),
            additionalYearGain: total + CalculationFacility.addInterest(total, interestRate),
            history: history,
            interestRate: interestRate
        }
        return result
    }
}