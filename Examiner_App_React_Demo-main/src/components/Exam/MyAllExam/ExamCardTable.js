import { Fragment, memo } from "react";

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
        {rows.map((row, i) => {
          return (
            <Fragment key={i}>
              <ExamCard row={row} activationHandler={activationHandler} />
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default memo(ExamCardTable);
