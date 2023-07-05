import React, {useEffect, useState} from "react";
import {userStateSelector} from "@context/redux/user/userSlice";
import {useSelector} from "react-redux";
import InputFormWithTail from "@components/investments-gains/InputFormWithTail";
import SelectBox from "@components/shared/SelectBox";
import {InformationCircleIcon} from "@heroicons/react/24/outline";

const currencies = ["$", "€", "£", "CHF"];

interface InputData {
  day1cash: number;
  customerLTV: number;
  customerCPL: number;
  showUpRate: number;
  showUpToCustomer: number;
}

interface ResultData {
  costPerShowUp: number;
  cpa: number; // cost per acquisition
  day1ROI: number;
  lifetimeROI: number;
}

const round = (num: number, zeroDecimals: boolean = true) =>
    zeroDecimals ? parseInt(num.toString()) : num;

const IndexPage = () => {
  const userState = useSelector(userStateSelector);
  const [currency, setCurrency] = useState<string>(currencies[0]);
  const [input, setInput] = useState<InputData | null>({
    day1cash: 0,
    customerLTV: 0,
    customerCPL: 0,
    showUpRate: 0,
    showUpToCustomer: 0,
  });
  const [result, setResult] = useState<ResultData | null>(null);
  const [hovered, setHovered] = useState<string>(``);

  useEffect(() => {
    if (userState.isAuthenticated) null;
  }, [userState.isAuthenticated]);

  const updateInput = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.id]: e.target.valueAsNumber || 0,
    }));
  };

  useEffect(() => {
    const costPerShowUp = input.showUpRate
        ? round((100 * input.customerCPL) / input.showUpRate)
        : 0;
    const costPerAcquisition = input.showUpToCustomer
        ? (100 * costPerShowUp) / input.showUpToCustomer
        : 0;
    setResult((prev) => ({
      ...prev,
      costPerShowUp: costPerShowUp,
      cpa: costPerAcquisition,
      day1ROI:
          input.day1cash && costPerAcquisition
              ? (input.day1cash / costPerAcquisition) * 100
              : 0,
      lifetimeROI:
          input.customerLTV && costPerAcquisition
              ? (input.customerLTV / costPerAcquisition) * 100
              : 0,
    }));
  }, [input]);

  return (
      <>
        <div className="flex flex-col w-full min-h-full px-4 py-4 sm:px-6 sm:py-8 lg:px-8 bg-gray-100  ">
          <h1 className={`text-2xl font-light mb-12 mt-4 text-center`}>
            LTV (Life Time Value) Calculator
          </h1>
          <div
              className={`flex flex-row w-full h-fit rounded-lg shadow-xl overflow-hidden text-black`}
          >
            <div
                className={`w-full sm:w-6/12 bg-white p-12 flex flex-col items-stretch justify-start gap-y-4 font-light`}
            >
              <div className={`ml-auto mr-2 mb-0`}>
                <SelectBox
                    label={"Currency"}
                    name={"currency"}
                    options={currencies}
                    defaultValue={currency}
                    updateSelection={(val) => setCurrency(val)}
                />
              </div>
              <h3 className={`font-normal text-normal`}>
                {" "}
                Please enter the Metrics, Rates, and Leads below:
              </h3>
              <InputFormWithTail
                  label={"Average Purchase Value"}
                  type={"number"}
                  name={"avgPurchaseValue"}
                  placeholder={"200"}
                  value={input.day1cash}
                  updateValue={updateInput}
                  tailText={currency}
                  orientation={`horizontal`}
                  fullWith
              ></InputFormWithTail>
              <InputFormWithTail
                  label={"Cost of good/service sold"}
                  type={"number"}
                  name={"costPercentage"}
                  placeholder={"25"}
                  value={input.customerLTV}
                  updateValue={updateInput}
                  tailText={`%`}
                  orientation={`horizontal`}
                  fullWith
              />
              <h3 className={`mt-4 font-bold text-normal`}>
                {" "}
                Enter Customer Behaviour:
              </h3>
              <InputFormWithTail
                  label={"Returns per year"}
                  type={"number"}
                  name={"returnsPerYear"}
                  placeholder={"4"}
                  value={input.customerCPL}
                  updateValue={updateInput}
                  orientation={`horizontal`}
                  fullWith
              />
              <InputFormWithTail
                  label={"Customer Term in Years"}
                  type={"number"}
                  name={"termsInYears"}
                  placeholder={"2"}
                  value={input.customerCPL}
                  updateValue={updateInput}
                  orientation={`horizontal`}
                  fullWith
              />
              <InputFormWithTail
                  label={"Number of Referrals"}
                  type={"number"}
                  name={"referrals"}
                  placeholder={"1"}
                  value={input.showUpRate}
                  updateValue={updateInput}
                  orientation={`horizontal`}
                  fullWith
              />
            </div>
            <div
                className={`w-full sm:w-6/12 bg-indigo-600 text-xl text-white p-12 font-light items-center justify-center`}
            >
              <div
                  className={`w-full h-full m-auto flex justify-center items-center flex-col gap-y-4 text-2xl`}
              >
                <p className={`font-normal`}>Lifetime Value</p>
                <p>
                  {currency} {result?.costPerShowUp || ``}
                </p>
              </div>
            </div>
          </div>
          <h1 className={`text-2xl font-light mb-12 mt-4 text-center mt-16`}>
            Local Business ROI Calculator
          </h1>
          <div
              className={`flex flex-row w-full h-fit rounded-lg shadow-xl overflow-hidden text-black`}
          >
            <div
                className={`w-full sm:w-6/12 bg-white p-12 flex flex-col items-stretch justify-start gap-y-4 font-light`}
            >
              <div className={`ml-auto mr-2 mb-0`}>
                <SelectBox
                    label={"Currency"}
                    name={"currency"}
                    options={currencies}
                    defaultValue={currency}
                    updateSelection={(val) => setCurrency(val)}
                />
              </div>
              <h3 className={`font-normal text-normal`}> Revenue Numbers:</h3>
              <InputFormWithTail
                  label={"Day 1 Cash Collected"}
                  type={"number"}
                  name={"day1cash"}
                  placeholder={"200"}
                  value={input.day1cash}
                  updateValue={updateInput}
                  tailText={currency}
                  orientation={`horizontal`}
                  fullWith
              >
                <div
                    className={`relative`}
                    onMouseEnter={() => setHovered("day1Cash")}
                    onMouseLeave={() => setHovered(``)}
                >
                  <InformationCircleIcon
                      className={`w-4 h-4 ml-2 cursor-pointer`}
                  />
                  {hovered === `day1Cash` && (
                      <p
                          className={`absolute top-5 shadow-md py-1.5 px-3 rounded-lg text-gray-700 border w-44 text-xs`}
                      >
                        Indicates the payment the client does on first show up
                      </p>
                  )}
                </div>
              </InputFormWithTail>
              <InputFormWithTail
                  label={"Customer LTV"}
                  type={"number"}
                  name={"customerLTV"}
                  placeholder={"200"}
                  value={input.customerLTV}
                  updateValue={updateInput}
                  tailText={currency}
                  orientation={`horizontal`}
                  fullWith
              />
              <h3 className={`mt-4 font-bold text-normal`}> Costs:</h3>
              <InputFormWithTail
                  label={"CPL"}
                  type={"number"}
                  name={"customerCPL"}
                  placeholder={"200"}
                  value={input.customerCPL}
                  updateValue={updateInput}
                  tailText={currency}
                  orientation={`horizontal`}
                  fullWith
              />
              <InputFormWithTail
                  label={"Show Up Rate"}
                  type={"number"}
                  name={"showUpRate"}
                  placeholder={"60"}
                  value={input.showUpRate}
                  updateValue={updateInput}
                  tailText={"%"}
                  orientation={`horizontal`}
                  fullWith
              />
              <InputFormWithTail
                  label={"Show Up to Customer"}
                  type={"number"}
                  name={"showUpToCustomer"}
                  placeholder={"20"}
                  value={input.showUpToCustomer}
                  updateValue={updateInput}
                  tailText={"%"}
                  orientation={`horizontal`}
                  fullWith
              />
            </div>
            <div
                className={`w-full sm:w-6/12 bg-indigo-600 text-xl text-white p-12 font-light items-center justify-center`}
            >
              <div className={`w-full h-full m-auto`}>
                <div className={`flex items-center flex-col gap-y-3`}>
                  <p className={`font-normal`}>Cost per Show Up</p>
                  <p>
                    {currency} {result?.costPerShowUp || ``}
                  </p>
                </div>
                <div className={`flex items-center flex-col gap-y-3 mt-8`}>
                  <p className={`font-normal`}>CPA</p>
                  <p>
                    {currency} {result?.cpa ? result?.cpa?.toFixed(0) : ``}
                  </p>
                </div>
                <div className={`flex items-center flex-col gap-y-3 mt-8`}>
                  <p className={`font-normal`}>Day 1 ROI</p>
                  <p>{result?.day1ROI ? result?.day1ROI?.toFixed(2) : ``} %</p>
                </div>
                <div className={`flex items-center flex-col gap-y-3 mt-8`}>
                  <p className={`font-normal`}>Lifetime ROI</p>
                  <p>
                    {result?.lifetimeROI ? result?.lifetimeROI?.toFixed(2) : ``} %
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
};

export default IndexPage;
