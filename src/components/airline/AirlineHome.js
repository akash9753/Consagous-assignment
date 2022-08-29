/* eslint-disable react-hooks/exhaustive-deps */
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
import { BeatLoader } from "react-spinners";
import { FcRight, FcLeft } from "react-icons/fc";
import Navbar from "../commonComponent/Navbar";


const getAirLineDataurl = "https://api.instantwebtools.net/v1/airlines";

const AirlineHome = () => {
  const [airlines, setAirlines] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    setLoading(true);
    const getAirLineData = async () => {
      try {
        const data = await axios.get(getAirLineDataurl);
        setAirlines(data.data);
        setLoading(false);
        console.log("data", data.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getAirLineData();
  }, []);

  useEffect(() => {}, []);

  const viewAirlineById = async (id) => {
    navigate("/view-airline/" + id);
  };

  const COLUMNSCrud = [
    {
      Header: "Name",
      accessor: "name",
      Filter: ColumnFilter,
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
      Header: "Action",
      accessor: "actionDelete",
      disableFilters: true,
      Cell: ({ row }) => (
        <button
          className="btn btn-primary"
          onClick={() => viewAirlineById(row.original.id)}
        >
          View
        </button>
      ),
    },
  ];
  
  
  const columns = useMemo(() => COLUMNSCrud, []);
  const data = useMemo(() => airlines, [airlines]);
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

      <>
        <div style={{ display: "inline-block" }}>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </div>
        <div style={{ display: "inline-block", marginLeft: 10 }}>
          <button
            onClick={() => navigate("/create-airline")}
            className="btn btn-primary"
          >
            Create Airline
          </button>
          
        </div>
        <div style={{ display: "inline-block", marginLeft: 10 }}>
          <button
            onClick={() => navigate("/passanger-detail")}
            className="btn btn-primary"
          >
            Passanger Detail
          </button>
        </div>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => {
              return (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
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

          {!loading ? (
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
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              Loading...{" "}
              <BeatLoader
              />
              Please wait
            </div>
          )}
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
    </>
  );
};

export default AirlineHome;
