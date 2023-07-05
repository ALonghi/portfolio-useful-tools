import {CalculatedResult, frequency, YearlyResult} from "../pages";

export default class CalculationFacility {
    static addInterest = (currentValueInvested, interestRate): number =>
        (currentValueInvested * interestRate) / 100;

    static calculate = (
        startCapital: number,
        interestRate: number,
        frequency: frequency,
        amountToInvest: number,
        years: number
    ): CalculatedResult => {
        let total: number = startCapital || 0;
        let history: YearlyResult[] = [];
        const yearlyInvestment: number =
            frequency === `Yearly` ? amountToInvest : amountToInvest * 12;

        for (let i: number = 1; i <= years; i++) {
            const amountToAdd = CalculationFacility.addInterest(
                total + yearlyInvestment,
                interestRate
            );
            const yearData: YearlyResult = {
                year: i,
                currentInvestedValue: total + yearlyInvestment,
                yearGain: parseInt(amountToAdd.toFixed()),
                totalCapital: parseInt(
                    (total + amountToAdd + yearlyInvestment).toFixed()
                ),
            };
            total += amountToAdd + yearlyInvestment;
            history.push(yearData);
        }
        const result: CalculatedResult = {
            yearlyInvested: yearlyInvestment,
            totalInvested: yearlyInvestment * years + startCapital,
            totalValue: parseInt(total.toFixed()),
            amountGained: parseInt(
                (total - yearlyInvestment * years - startCapital).toFixed()
            ),
            years: years,
            firstYearGain:
                yearlyInvestment +
                CalculationFacility.addInterest(
                    yearlyInvestment + startCapital,
                    interestRate
                ),
            additionalYearGain:
                total + CalculationFacility.addInterest(total, interestRate),
            history: history,
            interestRate: interestRate,
        };
        return result;
    };
}
