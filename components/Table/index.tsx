import React from "react";

type PropTypes = {
  data: Record<string, string | number>[];
};

export default function ServerTable({ data }: PropTypes) {
  const columns = Array.from(
    new Set(data.flatMap((item) => Object.keys(item)))
  );
  return (
    <div className="bg-default-50 p-5 rounded-2xl">
      <table className="w-full">
        <thead className="bg-default-200 p-10 rounded-lg">
          <tr className="">
            {columns.map((column, i) => {
              const roundedLeftClass = i === 0 ? "rounded-l-lg" : "";
              const roundedRightClass =
                i === columns.length - 1 ? "rounded-r-lg" : "";
              const roundedClassName = `${roundedLeftClass} ${roundedRightClass}`;
              return (
                <th
                  className={`${roundedClassName} pt-3 pb-3 text-default-500 capitalize font-bold text-left pl-2 pr-2`}
                  key={column}
                >
                  {column}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => {
            return (
              <tr key={i}>
                {columns.map((columnName, j) => {
                  const columnData = item[columnName] || "-";

                  return (
                    <th
                      className="pt-3 pb-4 font-light text-left pl-2 pr-2"
                      key={j}
                    >
                      {columnData}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
