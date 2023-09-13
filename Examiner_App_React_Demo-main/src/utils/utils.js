import AdbIcon from "@mui/icons-material/Adb";

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

export const QUE_SUBMIT_MESSAGE =
  "Are You sure to Submit.\n You will not be Allowed to edit again.";
export const RESET_TEXT =
  "Are you sure you want to reset back to the default code template? If you click OK you will lose your current code.";

export const getCode = ({ answer, attendQuestionId, language_res }) => {
  const code =
    answer[attendQuestionId] && answer[attendQuestionId][language_res]
      ? answer[attendQuestionId][language_res]
      : INIT_CODE?.[language_res]
      ? INIT_CODE[language_res]
      : "";
  return code;
};
