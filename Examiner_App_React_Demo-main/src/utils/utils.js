import AdbIcon from "@mui/icons-material/Adb";
import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  cSvg,
  cppSvg,
  javaSvg,
  javascriptSvg,
  phpSvg,
  pythonSvg,
  rubyonrailsSvg,
  typescriptSvg,
} from "./svgPack";
import css from "./LanguageSelect.module.css";

export const FULL_SCREEN_ALERT_MESS =
  'Exiting Full Screen Mode during the exam will auto-submit your answers, leading to disqualification.\nPlease press "Stay" to continue the exam and remain in Full Screen Mode.';

export const FULL_SCREEN_MESS =
  "Enter the Full Screen mode before going into the exam and don't leave it.\nDon't even press the F5, F11, or Esc keys. It will affect the exam result.";

export const INIT_CODE = {
  PYTHON3: `name = input()\t\t\t# Reading input from STDIN\nprint('Hi, %s.' % name)\t\t# Writing output to STDOUT`,
  JAVASCRIPT_NODE: `process.stdin.resume(); 
var i = 0, t = 0; 
process.stdin.on('data', function (n) {
        main(n.toString());
        process.exit(); 
}); 
function main(arg) { 
  return arg
}`,
  PHP: `<?php\n/*\n\n// Sample code to perform I/O:\n\n\nfscanf(STDIN, "%s\n", $name);           // Reading input from STDIN\necho "Hi, ".$name.".\n";\n?>`,
  JAVA14: `import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.*;
class MainClass {
    public static void main(String args[] ) throws Exception {
        //BufferedReader
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String name = br.readLine();                // Reading input from STDIN
        System.out.println("Hi, " + name + ".");    // Writing output to STDOUT
    }
}
`,
  TYPESCRIPT: `process.stdin.on('data', function (n: any) {
        main(n.toString());
        process.exit(); 
}); 
function main(arg: string) { 
    console.log(arg)
  return arg
}`,
  CPP17: `#include <iostream>
using namespace std;
int main() {
	int num;
	cin >> num;    //Reading input from STDIN
	cout << "Input number is " << num << endl;	// Writing output to STDOUT
}`,
  RUBY: `name = gets.chomp     
print "Hi, #{name}.\n"`,
  C: `#include <stdio.h>

int main(){
	int num;
	scanf("%d", &num);              	                  // Reading input from STDIN
	printf("Input number is %d.\n", num);       // Writing output to STDOUT
}`,
};

export const LogoText = () => (
  <div style={{ display: "flex", padding: "5px" }}>
    <AdbIcon
      sx={{
        display: { xs: "block", md: "flex" },
        mr: 1,
        color: "#0c1f4d",
      }}
    />
    <span
      style={{
        fontSize: "26px",
        fontWeight: 700,
        lineHeight: 1,
        color: "#012970",
        fontFamily: '"Nunito", sans-serif',
      }}
    >
      CoderTest
    </span>
  </div>
);

export const ButtonCss = {
  backgroundColor: "#0c1f4d",
  padding: "5px 5px",
  "&:hover": {
    backgroundColor: "transparent",
    border: "1px solid #0c1f4d",
    color: "#0c1f4d",
  },
};

export const QUE_SUBMIT_MESSAGE =
  "Are You sure to Submit.\n You will not be Allowed to edit again.";
export const RESET_TEXT =
  "Are you sure you want to reset back to the default code template? If you click OK you will lose your current code.";

export const assessmentOC_text = (check) =>
  `Are you sure you want to ${check ? "open" : "close"} this assessment?`;

export const getCode = ({ answer, attendQuestionId, language_res }) => {
  const code =
    answer[attendQuestionId] && answer[attendQuestionId][language_res]
      ? answer[attendQuestionId][language_res]
      : INIT_CODE?.[language_res]
      ? INIT_CODE[language_res]
      : "";
  return code;
};

export const all_language_arr = [
  { key: "JAVASCRIPT_NODE", value: "javascript" },
  { key: "PYTHON3", value: "python" },
  { key: "PHP", value: "php" },
  { key: "JAVA14", value: "java" },
  { key: "TYPESCRIPT", value: "typescript" },
  { key: "CPP17", value: "cpp" },
  { key: "RUBY", value: "ruby" },
  { key: "C", value: "c" },
];

export const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 38,
  height: 22,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 1,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 20,
    height: 20,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export const headCells = [
  {
    id: "name",
    numeric: false,
    label: "Name",
    align: "left",
  },
  {
    id: "email",
    numeric: false,
    label: "Email",
    align: "left",
    minWidth: 170,
  },
  {
    id: "status",
    label: "Status",
    align: "left",
  },
  {
    id: "join",
    label: "Join",
    align: "left",
  },
  {
    id: "percent_mark",
    numeric: false,
    label: "Score",
    align: "left",
  },
  {
    id: "copy_detect",
    numeric: false,
    label: "Cheating",
    align: "left",
  },
  {
    id: "time_taken",
    numeric: false,
    label: "Time Taken",
    align: "left",
  },
  {
    id: "exam",
    numeric: false,
    label: "Exam",
    align: "left",
  },
  {
    id: "action",
    numeric: false,
    label: "Action",
    align: "center",
  },
];

export const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
export const modules = {
  toolbar: [
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    // ["link", "image"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
      { align: [] },
    ],
    [
      {
        color: [
          "#000000",
          "#e60000",
          "#ff9900",
          "#ffff00",
          "#008a00",
          "#0066cc",
          "#9933ff",
          "#ffffff",
          "#facccc",
          "#ffebcc",
          "#ffffcc",
          "#cce8cc",
          "#cce0f5",
          "#ebd6ff",
          "#bbbbbb",
          "#f06666",
          "#ffc266",
          "#ffff66",
          "#66b966",
          "#66a3e0",
          "#c285ff",
          "#888888",
          "#a10000",
          "#b26b00",
          "#b2b200",
          "#006100",
          "#0047b2",
          "#6b24b2",
          "#444444",
          "#5c0000",
          "#663d00",
          "#666600",
          "#003700",
          "#002966",
          "#3d1466",
          "custom-color",
        ],
      },
    ],
  ],
};
export const languagesSvg = {
  JAVASCRIPT_NODE: javascriptSvg(css.chipIcon),
  PYTHON3: pythonSvg(css.chipIcon),
  PHP: phpSvg(css.chipIcon),
  JAVA14: javaSvg(css.chipIcon),
  TYPESCRIPT: typescriptSvg(css.chipIcon),
  CPP17: cppSvg(css.chipIcon),
  RUBY: rubyonrailsSvg(css.chipIcon),
  C: cSvg(css.chipIcon),
};
// eslint-disable-next-line no-lone-blocks
{
  /* <button
  type="button"
  className={row.is_deleted ? `btn btn-warning` : `btn btn-danger`}
  onClick={(e) => {
    deletionHandler(e, row);
  }}
  style={{ margin: "0px 10px" }}
>
  {row?.is_deleted ? (
    <RestoreFromTrashIcon style={{ color: "white" }} />
  ) : (
    <DeleteIcon style={{ color: "white" }} />
  )}
</button>; */
}
