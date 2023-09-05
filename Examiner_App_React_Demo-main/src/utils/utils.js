import AdbIcon from "@mui/icons-material/Adb";

export const FULL_SCREEN_ALERT_MESS =
  'Exiting Full Screen Mode during the exam will auto-submit your answers, leading to disqualification.\nPlease press "Stay" to continue the exam and remain in Full Screen Mode.';

export const FULL_SCREEN_MESS =
  "Enter the Full Screen mode before going into the exam and don't leave it.\nDon't even press the F5, F11, or Esc keys. It will affect the exam result.";

export const INIT_CODE = {
  PYTHON3: `name = input()\t\t\t# Reading input from STDIN\nprint('Hi, %s.' % name)\t\t# Writing output to STDOUT`,
  JAVASCRIPT_NODE: `const def(arg){\n\treturn arg;\n} def(input);`,
  PHP: `<?php\n/*\n\n// Sample code to perform I/O:\n\n\nfscanf(STDIN, "%s\n", $name);           // Reading input from STDIN\necho "Hi, ".$name.".\n";                // Writing output to STDOUT\n\n// Warning: Printing unwanted or ill-formatted data to output will cause the test cases to fail\n*/\n\n// Write your code here\n?>`,
  JAVA14: `JAVA`,
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

export const QUE_SUBMIT_MESSAGE =
  "Are You sure to Submit.\n You will not be Allowed to edit again.";
export const REST_TEXT =
  "Are you sure you want to reset back to the default code template? If you click OK you will lose your current code.";
