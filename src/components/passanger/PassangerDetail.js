import React from "react";
import { useState, useEffect } from "react";
import { useMemo } from "react";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  useSortBy,
  usePagination,
} from "react-table";
import "../../style/table.css";
import GlobalFilter from "../commonComponent/GlobalFilter";
import ColumnFilter from "../commonComponent/ColumnFilter";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FcRight, FcLeft } from "react-icons/fc";
import Navbar from "../commonComponent/Navbar";
const getAirLineDataurl =
  "https://api.instantwebtools.net/v1/passenger?page=0&size=10";

const PassangerDetail = () => {
  const [passangersData, setPassangersData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAirLineData = async () => {
      try {
        const data = await axios.get(getAirLineDataurl);
        console.log(data);
        let tempArray = [];
        data.data.data.map((items) => {
          items.airline.map((air) => {
            tempArray.push({
              _id: items._id,
              username: items.name,
              trips: items.trips,
              country: air.country,
              logo: air.logo,
              slogan: air.slogan,
              head_quaters: air.head_quaters,
              website: air.website,
              established: air.established,
            });
          });
        });
        console.log("tempArray", tempArray);
        setPassangersData(tempArray);
      } catch (error) {
        console.log(error);
      }
    };
    getAirLineData();
  }, []);

  const viewAirlineById = async (id) => {
    navigate("/view-passanger/" + id);
  };
  const COLUMNSCrud = [
    {
      Header: "Name",
      accessor: "username",
      Filter: ColumnFilter,
    },
    {
      Header: "Trips",
      accessor: "trips",
    },
    {
      Header: "Country",
      accessor: "country",
    },
    {
      Header: "Logo",
      accessor: "logo",
      Cell: (row) => {
        return <img width={100} src={row.value} alt="im" />;
      },
    },
    {
      Header: "Slogan",
      accessor: "slogan",
    },
    {
      Header: "Head Quaters",
      accessor: "head_quaters",
    },
    {
      Header: "Website",
      accessor: "website",
    },
    {
      Header: "Established",
      accessor: "established",
      disableFilters: true,
    },
    {
      Header: "View Details",
      accessor: "_id",
      disableFilters: true,
      Cell: (row) => (
        <button
          className="btn btn-primary"
          onClick={() => viewAirlineById(row.value)}
        >
          View
        </button>
      ),
    },
    {
      Header: "Delete",
      accessor: "actionDelete",
      disableFilters: true,
      Cell: ({ row }) => (
        <button
          className="btn btn-danger"
          onClick={() => viewAirlineById(row.original.id)}
        >
          Delete
        </button>
      ),
    },
  ];

  const columns = useMemo(() => COLUMNSCrud, []);
  const data = useMemo(() => passangersData, [passangersData]);
  console.log("Data", data);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter,
  } = tableInstance;
  console.log("page from 176 ln", page);
  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <Navbar />
      <div style={{ display: "inline-block" }}>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <div style={{ display: "inline-block", marginLeft: 10 }}>
        <button
          onClick={() => navigate("/create-passanger")}
          className="btn btn-primary"
        >
          Create Passanger
        </button>
      </div>

      <table {...getTableProps()}>
        <thead style={{ backgroundColor: "red" }}>
          {headerGroups.map((headerGroup) => {
            return (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <>
                            {" "}
                            <i className="fa-solid fa-square-caret-down"> </i>
                          </>
                        ) : (
                          <>
                            {" "}
                            <i className="fa-solid fa-square-caret-up"> </i>
                          </>
                        )
                      ) : (
                        ""
                      )}
                    </span>
                    <div></div>
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
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
      <div className="App">
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go To page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 15, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              show {pageSize}
            </option>
          ))}
        </select>
        <button
          style={{ marginLeft: "8px" }}
          className="btn btn-light"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>
        <button
          style={{ marginLeft: "8px" }}
          className="btn btn-light"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <FcLeft />{" "}
        </button>
        <button
          style={{ marginLeft: "8px" }}
          className="btn btn-light"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <FcRight />{" "}
        </button>
        <button
          style={{ marginLeft: "8px" }}
          className="btn btn-light"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>
      </div>
    </>
  );
};

export default PassangerDetail;
