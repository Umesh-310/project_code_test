import { memo, useEffect, useState, useCallback, Fragment } from "react";

import PropTypes from "prop-types";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { visuallyHidden } from "@mui/utils";

import QuestionEditModal from "./QuestionEditModel";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "title",
    numeric: false,
    label: "Title",
    align: "left",
    minWidth: 170,
  },
  {
    id: "level",
    numeric: false,
    label: "Level",
    align: "center",
    minWidth: 170,
  },
  {
    id: "is_private",
    label: "Access",
    minWidth: 170,
    align: "center",
    format: (value) => {
      return value === true ? "Private" : "Public";
    },
  },
  {
    id: "action",
    numeric: false,
    label: "Action",
    align: "right",
  },
];

const DEFAULT_ORDER = "asc";
const DEFAULT_ORDER_BY = "created_at";
const DEFAULT_ROWS_PER_PAGE = 5;

function EnhancedTableHead(props) {
  const { order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            style={{
              minWidth: headCell.minWidth,
              fontWeight: 900,
              fontSize: "18px",
            }}
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
            // colSpan={2}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTable({
  data: rows,
  deletionHandler,
  onQuestionUpdateHandler,
  onTestcaseUpdateHandler,
  onSubmitHandler,
}) {
  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
  const [page, setPage] = useState(0);
  const [visibleRows, setVisibleRows] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = useState(0);

  useEffect(() => {
    let rowsOnMount = stableSort(
      rows,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY),
    );

    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
    );
    setVisibleRows(rowsOnMount);
  }, [rows]);

  const handleRequestSort = useCallback(
    (event, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(
        rows,
        getComparator(toggledOrder, newOrderBy),
      );
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      );
      setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rowsPerPage, rows],
  );

  const handleChangePage = useCallback(
    (event, newPage) => {
      setPage(newPage);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage,
      );

      setVisibleRows(updatedRows);

      // Avoid a layout jump when reaching the last page with empty rows.
      const numEmptyRows =
        newPage > 0
          ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length)
          : 0;

      const newPaddingHeight = 33 * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
    },
    [order, orderBy, rowsPerPage, rows],
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage,
      );

      setVisibleRows(updatedRows);

      // There is no layout jump to handle on the first page.
      setPaddingHeight(0);
    },
    [order, orderBy, rows],
  );

  if (rows.length <= 0) {
    return (
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <h3> No Data Found</h3>
      </Box>
    );
  } else {
    return (
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"small"}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows
                  ? visibleRows.map((row, index) => {
                      return (
                        <Fragment key={row.id}>
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.name}
                            sx={{
                              cursor: "pointer",
                              backgroundColor: row?.is_deleted ? "#dee2e6" : "",
                            }}
                            className={
                              row?.is_deleted ? `bg-#e9ecef bg-gradient` : ``
                            }
                          >
                            <TableCell component="th">{row.title}</TableCell>
                            <TableCell align="center">
                              {row?.level === "Easy" && (
                                <button
                                  type="button"
                                  className="btn btn-success rounded-pill"
                                  disabled
                                >
                                  Easy
                                </button>
                              )}
                              {row?.level === "Medium" && (
                                <button
                                  type="button"
                                  className="btn btn-warning rounded-pill"
                                  disabled
                                >
                                  Medium
                                </button>
                              )}
                              {row?.level === "Hard" && (
                                <button
                                  type="button"
                                  className="btn btn-danger rounded-pill"
                                  disabled
                                >
                                  Hard
                                </button>
                              )}
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                color: row?.is_private ? "green" : "blue",
                              }}
                            >
                              {row.is_private ? "Private" : "Public"}
                            </TableCell>
                            <TableCell>
                              <button
                                type="button"
                                className={
                                  row.is_deleted
                                    ? `btn btn-warning`
                                    : `btn btn-danger`
                                }
                                onClick={(e) => {
                                  deletionHandler(e, row);
                                }}
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                title={row.is_deleted ? `Restore` : `Delete`}
                              >
                                {row?.is_deleted ? (
                                  <RestoreFromTrashIcon
                                    style={{ color: "white" }}
                                  />
                                ) : (
                                  <DeleteIcon style={{ color: "white" }} />
                                )}
                              </button>
                            </TableCell>
                            <TableCell>
                              <QuestionEditModal
                                row={row}
                                onQuestionUpdateHandler={
                                  onQuestionUpdateHandler
                                }
                                onTestcaseUpdateHandler={
                                  onTestcaseUpdateHandler
                                }
                                onSubmitHandler={onSubmitHandler}
                              />
                            </TableCell>
                          </TableRow>
                        </Fragment>
                      );
                    })
                  : null}
                {paddingHeight > 0 && (
                  <TableRow
                    style={{
                      height: paddingHeight,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[1, 2, 5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    );
  }
}

export default memo(EnhancedTable);
