import React, { useMemo } from "react";
import insuranceCalculator from "../../assets/helper";

function Illustration({ data }) {
  if (!data) return <p>Loading....</p>;
  const tableData = useMemo(() => insuranceCalculator(data), [data]);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full border-sm">
        <table className="table-auto text-center">
          <thead
            className="
            bg-blue-500
            text-white
            text-left
            text-sm
            font-semibold
            uppercase
            tracking-wider"
          >
            <tr className="">
              <th className="px-4 py-2">Policy Year</th>
              <th className="px-4 py-2">Premium</th>
              <th className="px-4 py-2">Sum Assured</th>
              <th className="px-4 py-2">Bonus Rate</th>
              <th className="px-4 py-2">Bonus Amount</th>
              <th className="px-4 py-2">Total Benefit</th>
              <th className="px-4 py-2">Net Cash Flows</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data) => (
              <tr key={data.policyYear} >
                <td className="border px-4 py-2 bg-blue-50">{data.policyYear}</td>
                <td className="border px-4 py-2">{data.premium}</td>
                <td className="border px-4 py-2">{data.sumAssured}</td>
                <td className="border px-4 py-2">{data.bonusRate}</td>
                <td className="border px-4 py-2">{data.bonusAmount}</td>
                <td className="border px-4 py-2">{data.totalBenefit}</td>
                <td className="border px-4 py-2">{data.netCashFlows}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Illustration;
