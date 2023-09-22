import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Mui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

// icons
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

import css from "./ExamCardTable.module.css";
import ExamEditModal from "./ExamEditModal";
import { Box } from "@mui/material";
import moment from "moment";
import { IOSSwitch } from "../../../utils/utils";

const ExamCardTable = ({
  data: rows,
  onExamUpdateHandler,
  deletionHandler,
  activationHandler,
}) => {
  const CopyToClipboardHandler = (e, row) => {
    navigator.clipboard.writeText(row.exam_link);
    toast.info("Exam Link Coppied to Clipboard..");
  };
  const qualified = (qual, total) => {
    const percentage = (qual * 100) / total;
    return total === 0 || percentage === 0
      ? 0
      : parseFloat(percentage).toFixed(2);
  };
  const navigate = useNavigate();

  return (
    <>
      <div className={css.check}>
        {rows.map((row) => {
          const CreateDate = moment(row?.created_at).format("ll");
          console.log({ CreateDate });
          return (
            <Card>
              <CardContent>
                <Box className={css.examCardHeader}>
                  <Typography gutterBottom variant="h6" component="div">
                    {row.title}
                  </Typography>
                  <Box>
                    <button
                      type="button"
                      className="btn"
                      onClick={() =>
                        navigate(`/exam/exam_detail/${row.id}/edit`)
                      }
                    >
                      <DriveFileRenameOutlineIcon
                        sx={{ color: "#0c1f4d", fontSize: "18px" }}
                      />
                    </button>
                    <Link
                      className="btn btn-outline-primary"
                      to={`/exam/exam_detail/${row.id}`}
                      style={{ marginLeft: "10px" }}
                    >
                      open <ArrowForwardIcon sx={{ fontSize: "15px" }} />
                    </Link>
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  className={css.cardBody}
                  color="text.secondary"
                >
                  <Box className={css.qualified}>
                    <h2>
                      {`${qualified(
                        row?.total_attendee?.qualified_attendee,
                        row?.total_attendee?.total_attendee
                      )}%`}
                    </h2>
                    <span>Qualifying</span>
                  </Box>
                  <Box className={css.challenges}>
                    <h2>{row.total_question}</h2>
                    <span>Challenges</span>
                  </Box>
                  <Box className={css.Attendee}>
                    <h2>Attendee</h2>
                    <span>{row.total_attendee.total_attendee} Assessed</span>
                    <span>
                      {row.total_attendee.qualified_attendee} Qualified
                    </span>
                  </Box>
                </Typography>
              </CardContent>
              <CardActions className={css.examCardBottom}>
                <div className={css.flex}>
                  <IOSSwitch
                    onClick={(e) => {
                      activationHandler(e, row);
                    }}
                    sx={{ marginRight: "20px" }}
                    checked={row?.is_active}
                  />
                  <span
                    onClick={(e) => {
                      CopyToClipboardHandler(e, row);
                    }}
                    className={css.copyLinkBtn}
                  >
                    <ContentCopyIcon fontSize="16px" /> Copy Exam Link
                  </span>
                </div>
                <div className={css.ExamDate}>
                  <span>{CreateDate}</span>
                </div>
              </CardActions>
            </Card>
            // <div className="col-md-6">
            //   <div className="card text-center">
            //     <div className="card-header">
            //       <ul
            //         className="nav nav-pills card-header-pills"
            //         style={{ display: "flex", justifyContent: "space-between" }}
            //       >
            //         <li className="nav-item">
            //           <h5 className="custom-form-label">{row.title}</h5>
            //         </li>
            //         <li className="nav-item">
            //           <Link
            //             className="btn btn-outline-primary"
            //             to={`/exam/exam_detail/${row.id}`}
            //             style={{ marginLeft: "10px" }}
            //           >
            //             open <ArrowForwardIcon sx={{ fontSize: "15px" }} />
            //           </Link>
            //         </li>
            //       </ul>
            //     </div>
            //     <div className="card-body">
            //       <div className="row">
            //         <div className="col-md-4">
            //           <h5 className="card-title">Qualified</h5>
            //           <p className="card-text">
            // {`${qualified(
            //   row?.total_attendee?.qualified_attendee,
            //   row?.total_attendee?.total_attendee
            // )}%`}
            //           </p>
            //         </div>
            //         <div className="col-md-4">
            //           <h5 className="card-title">Questions</h5>
            //           <p className="card-text">
            //             {row.total_question} Questions
            //           </p>
            //         </div>
            //         <div className="col-md-4">
            //           <h5 className="card-title">Attendee</h5>
            //           <p className="card-text">
            //             {row.total_attendee.total_attendee} Assessed
            //           </p>
            //           <p className="card-text">
            //             {row.total_attendee.qualified_attendee} Qualified
            //           </p>
            //         </div>
            //       </div>
            //     </div>
            //     <div
            //       className="card-footer"
            //       style={{ display: "flex", justifyContent: "space-between" }}
            //     >
            //       <div
            //         style={{ display: "flex", justifyContent: "space-between" }}
            //       >
            //         <div
            //           className="form-switch"
            //           style={{ marginRight: "20px" }}
            //         >
            //           <input
            //             name="is_active"
            //             class={
            //               row?.is_active
            //                 ? "form-check-input bg-success"
            //                 : "form-check-input"
            //             }
            //             checked={row?.is_active && "checked"}
            //             type="checkbox"
            //             id="is_active"
            //             onClick={(e) => {
            //               actvationHandler(e, row);
            //             }}
            //             style={{ border: row?.is_active && "none" }}
            //           />
            //         </div>
            //         <div>
            //           {row.is_active ? (
            //             <span
            //               onClick={(e) => {
            //                 CopyToClipboardHandler(e, row);
            //               }}
            //               style={{ color: "blue", cursor: "pointer" }}
            //             >
            //               <ContentCopyIcon /> Copy Exam Link
            //             </span>
            //           ) : null}
            //         </div>
            //       </div>
            //       <div>
            // <ExamEditModal
            //   row={row}
            //   onExamUpdateHandler={onExamUpdateHandler}
            // />
            //         {/*  <button
            //           type="button"
            //           className={
            //             row.is_deleted ? `btn btn-warning` : `btn btn-danger`
            //           }
            //           onClick={(e) => {
            //             deletionHandler(e, row);
            //           }}
            //           style={{ margin: "0px 10px" }}
            //         >
            //           {row?.is_deleted ? (
            //             <RestoreFromTrashIcon style={{ color: "white" }} />
            //           ) : (
            //             <DeleteIcon style={{ color: "white" }} />
            //           )}
            //         </button> */}
            //       </div>
            //     </div>
            //   </div>
            // </div>
          );
        })}
      </div>
    </>
  );
};

export default memo(ExamCardTable);
