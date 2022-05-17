import React, { useMemo } from "react";
import { Column, usePagination, useTable } from "react-table";
import { TrashIcon } from "@heroicons/react/solid";
import { Inputs } from "../types/inputs.interface";
import { Vehicle } from "../types/vehicles.interface";
import { handleDate } from "../utils/handleDate";
import { Button } from "./button";
import Form from "./form";
import { Loading } from "./loading";
import Modal from "./modal";
import Pagination from "./pagination";

const Table: React.FC<{
  data: Array<Vehicle>;
  submitHandler: (data: Inputs) => Promise<void>;
  deleteHandler: (id: number) => Promise<void>;
  loading: boolean;
}> = ({ data, submitHandler, deleteHandler, loading }) => {
  const columns: Array<Column> = useMemo(
    () => [
      {
        Header: "Plate",
        accessor: "plate",
      },
      { Header: "Model", accessor: "model" },
      { Header: "Type", accessor: "type" },
      { Header: "Capacity", accessor: "capacity" },
      {
        Header: "Creation Date",
        accessor: (row: any): string => handleDate(row.creationDate),
      },
      {
        Header: "Options",
        accessor: (row: any): Vehicle => row,
        Cell: ({ value }): any => {
          return (
            <>
              <Modal usage="edit">
                <Form vehicle={value} submitHandler={submitHandler} />
              </Modal>
              <Button
                onClick={async () => await deleteHandler(value.id)}
                className="ml-1 bg-slate-500 hover:bg-slate-400"
              >
                <TrashIcon
                  className="h-5 w-5 text-red-300"
                  aria-hidden="true"
                />
              </Button>
            </>
          );
        },
      },
    ],
    [deleteHandler, submitHandler]
  );

  const tableProps = useTable({ columns, data }, usePagination);
  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    tableProps;

  return (
    <>
      <div className="mt-4 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table
                {...getTableProps()}
                className="border-2 table-fixed min-w-full divide-y divide-gray-200"
              >
                <thead className="bg-gray-50">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps()}
                          className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          <div className="flex items-center justify-between">
                            <span>{column.render("Header")}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                >
                  {page.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        {row.cells.map((cell) => {
                          return (
                            <td className="p-1" {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Loading loading={loading} />
      <Pagination {...tableProps} />
    </>
  );
};

export default Table;
