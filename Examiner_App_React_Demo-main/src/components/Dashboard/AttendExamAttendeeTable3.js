import { memo, useEffect, useState, useCallback, Fragment } from "react";
import { Link } from "react-router-dom";

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
  Tooltip,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import moment from "moment";
import { headCells } from "../../utils/utils";
// icons
import AssessmentIcon from "@mui/icons-material/Assessment";
import WarningIcon from "@mui/icons-material/Warning";

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

const DEFAULT_ORDER = "desc";
const DEFAULT_ORDER_BY = "created_at";
const DEFAULT_ROWS_PER_PAGE = 10;

function EnhancedTableHead(props) {
  const { order, orderBy, rowCount, onRequestSort, showExam = true } = props;
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          if (!showExam && headCell.id === "exam") return null;
          if (showExam && headCell.id === "time_taken") return null;
          return (
            <TableCell
              style={{
                minWidth: headCell.minWidth,
                fontWeight: 900,
                fontSize: "18px",
              }}
              key={headCell.id}
              align={headCell.align}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          );
        })}
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

const getTimeTaken = (created, end) => {
  // Parse the time strings using Moment.js
  const created_at = moment(created);
  const end_time = moment(end);

  // Calculate the duration difference
  const duration = moment.duration(end_time.diff(created_at));

  // Get the hours and minutes
  const hours = duration.hours();
  const minutes = duration.minutes();

  // Format the time difference
  let formattedTime = "";
  if (!isNaN(minutes) || !isNaN(hours)) {
    if (hours > 0) {
      if (minutes > 0) {
        formattedTime = `${hours}h ${minutes}m`;
      } else {
        formattedTime = `${hours}h`;
      }
    } else {
      formattedTime = `${minutes}m`;
    }
    return formattedTime;
  } else {
    return "-";
  }
};

function EnhancedTable({ data: rows, showExam = true }) {
  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
  const [page, setPage] = useState(0);
  const [visibleRows, setVisibleRows] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [paddingHeight, setPaddingHeight] = useState(0);

  useEffect(() => {
    let rowsOnMount = stableSort(
      rows,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY)
    );

    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
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
        getComparator(toggledOrder, newOrderBy)
      );
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
      setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rowsPerPage, rows]
  );

  const handleChangePage = useCallback(
    (event, newPage) => {
      setPage(newPage);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage
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
    [order, orderBy, rowsPerPage, rows]
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);

      setRowsPerPage(updatedRowsPerPage);
      setPage(0);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage
      );

      setVisibleRows(updatedRows);
      // There is no layout jump to handle on the first page.
      setPaddingHeight(0);
    },
    [order, orderBy, rows]
  );

  if (rows?.length <= 0) {
    return (
      <Box sx={{ width: "100%", textAlign: "left" }}>
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
                showExam={showExam}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows?.length}
              />
              <TableBody>
                {visibleRows
                  ? visibleRows?.map((row, index) => {
                      const cheatingCheck =
                        row?.copy_detect +
                          row?.full_screen_leave +
                          row?.switched_tab +
                          row?.switched_window >
                        0;
                      const passFail =
                        row?.is_qualified ||
                        row?.exam?.passing_percent_mark <= row?.percent_mark;

                      const time_taken = getTimeTaken(
                        row?.created_at,
                        row?.end_time
                      );
                      return (
                        <Fragment key={row?.id}>
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row?.name}
                            sx={{ cursor: "pointer" }}
                          >
                            <TableCell component="th">
                              {row?.attendee?.name}
                            </TableCell>
                            <TableCell align="left">
                              {row?.attendee?.email}
                              {row?.retake_exam && (
                                <WarningIcon
                                  color="error"
                                  sx={{ marginLeft: "5px", fontSize: "22px" }}
                                />
                              )}
                            </TableCell>
                            <TableCell align="left">{row?.status}</TableCell>
                            <TableCell align="left">
                              {moment(row?.start_time).format("MMM D")}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{ color: passFail ? "green" : "gray" }}
                            >
                              {row?.percent_mark}%
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{ color: cheatingCheck ? "red" : "gray" }}
                            >
                              {cheatingCheck ? "Detected" : "Not Detected"}
                            </TableCell>
                            {showExam && (
                              <TableCell align="left">
                                <Link to={`/exam/exam_detail/${row?.exam?.id}`}>
                                  {row?.exam?.title}
                                </Link>
                              </TableCell>
                            )}
                            {!showExam && (
                              <TableCell align="center">{time_taken}</TableCell>
                            )}
                            <TableCell align="center">
                              <Link
                                // className="btn btn-primary"
                                to={`/exam/attendee_attend_exam_detail/${row?.id}`}
                              >
                                <Tooltip title="View report" arrow>
                                  <AssessmentIcon />
                                </Tooltip>
                              </Link>
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows?.length}
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
