import { memo } from "react";

import css from "./ExamCardTable.module.css";
import ExamCard from "./ExamCard";

const ExamCardTable = ({
  data: rows,
  onExamUpdateHandler,
  deletionHandler,
  activationHandler,
}) => {
  return (
    <>
      <div className={css.check}>
        {rows.map((row) => {
          return (
            <ExamCard row={row} activationHandler={activationHandler} />
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
