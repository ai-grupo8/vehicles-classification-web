import { Vehicle } from "@/shared/interfaces/vehicles.interface";
import React, { Fragment } from "react";
import { useTable } from "react-table";

const VehiclesTable: React.FC<{ data: Array<Vehicle> }> = ({ data }) => {
  const columns = React.useMemo(
    () => [
      { Header: "Plate", accesor: "plate" },
      { Header: "Model", accesor: "model" },
      { Header: "Type", accesor: "type" },
      { Header: "Capacity", accesor: "capacity" },
      { Header: "Creation date", accesor: "creationDate" },
    ],
    []
  );
  data = React.useMemo(() => data, [data]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  console.log({ headerGroups, rows });
  return (
    <Fragment>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            console.log(row);
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default VehiclesTable;
