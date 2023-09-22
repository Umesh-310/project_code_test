import { Button, Divider, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
// css
import css from "./PageTitle.module.css";
// icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RuleIcon from "@mui/icons-material/Rule";
import QuizIcon from "@mui/icons-material/Quiz";

const SideMenuBtn = () => {
  const [userMenu, setUserMenu] = useState(null);
  const openMenu = Boolean(userMenu);
  const handleClickMenu = (event) => {
    setUserMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setUserMenu(null);
  };
  return (
    <>
      <Menu
        id="user-menu "
        anchorEl={userMenu}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "user-menu-btn",
        }}
        PaperProps={{
          sx: {
            minWidth: 200,
          },
        }}
      >
        <Divider sx={{ borderColor: "gray" }} />

        <Link
          to="/exam/create_exam_with_selected_question"
          className={css.navText}
        >
          <MenuItem onClick={handleCloseMenu}>
            <RuleIcon sx={{ marginRight: "10px", fontSize: "30px" }} />
            <div className={css.Pagemenu}>
              <h4>Create from selection</h4>
              <span>Exam with selected Question</span>
            </div>
          </MenuItem>
        </Link>

        <Divider sx={{ borderColor: "gray" }} />
        <Link
          to="/exam/create_exam_with_random_question"
          className={css.navText}
        >
          <MenuItem onClick={handleCloseMenu}>
            <QuizIcon sx={{ marginRight: "10px", fontSize: "30px" }} />
            <div className={css.Pagemenu}>
              <h4>Create with random</h4>
              <span>Exam with random Question</span>
            </div>
          </MenuItem>
        </Link>
        <Divider sx={{ borderColor: "gray" }} />
      </Menu>
      <Button
        variant="contained"
        // onClick={() => navigate("/exam/create_exam_with_selected_question")}
        onClick={handleClickMenu}
        startIcon={<AddCircleOutlineIcon />}
      >
        New assessment
      </Button>
    </>
  );
};

export default SideMenuBtn;