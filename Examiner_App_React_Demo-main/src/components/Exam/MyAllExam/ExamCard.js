import { memo, useState } from "react";
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
import {
  IOSSwitch,
  assessmentOC_text,
} from "../../../utils/utils";
import DefaultModel from "../../Modal/DefaultModel";

const ExamCard = (props) => {
  const { row, activationHandler } = props;
  const CreateDate = moment(row?.created_at).format("ll");
  const CopyToClipboardHandler = (e, row) => {
    navigator.clipboard.writeText(row.exam_link);
    toast.info("Exam Link Copied to Clipboard..");
  };
  const qualified = (qual, total) => {
    const percentage = (qual * 100) / total;
    return total === 0 || percentage === 0
      ? 0
      : parseFloat(percentage).toFixed(2);
  };
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [eventRow, setEventRow] = useState(null);
  const closeModel = () => setOpen(false);
  const openModel = () => setOpen(true);

  const modelOnClick = () => {
    activationHandler(eventRow.e, eventRow.row);
    setEventRow(null);
    closeModel();
  };

  return (
    <>
      <DefaultModel
        open={open}
        handleClose={closeModel}
        onClick={modelOnClick}
        message={assessmentOC_text(!row?.is_active)}
        closeBtn="Cancel"
        arrgeBtn={!row?.is_active ? "Activate" : "Deactivate"}
      />
      <Card>
        <CardContent>
          <Box className={css.examCardHeader}>
            <Typography gutterBottom variant="h6" component="div">
              {row.title}
            </Typography>
            <Box>
              <Button
                onClick={() => navigate(`/exam/exam_detail/${row.id}/edit`)}
              >
                <DriveFileRenameOutlineIcon
                  sx={{ color: "#0c1f4d", fontSize: "18px" }}
                />
              </Button>
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
              <span>{row.total_attendee.qualified_attendee} Qualified</span>
            </Box>
          </Typography>
        </CardContent>
        <CardActions className={css.examCardBottom}>
          <div className={css.flex}>
            <IOSSwitch
              onClick={(e) => {
                // activationHandler(e, row);
                openModel();
                setEventRow({ e, row });
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
    </>
  );
};

export default ExamCard;
