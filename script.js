// Assignment code here
var generatePassword = function () {
  // Criteria:
  // - lowercase, uppercase, numeric, and/or special characters
  // - Length of 8-128 characters

  // Password Length
  var passwordLength = parseInt(
    prompt("Enter a password length from 8 to 128 characters.")
  );
  if (passwordLength < 8 || passwordLength > 128) {
    alert("ERROR: Must enter a value between 8 and 128.");
    generatePassword();
  }

  // Password Character Criteria
  // var hasLowercase = confirm("Include lowercase letters?");
  // var hasUppercase = confirm("Include uppercase letters?");
  // var hasNumbers = confirm("Include numbers?");
  // var hasSpecial = confirm("Include special characters?");

  // randomly select a character type (lower, upper, number, special)
  // then randomly select a character from that type (ex: number 1-9; lower a-z; upper A-Z; special \u0020 - \u007e)

  // ALL: 32 - 126
  
  // Lowercase Alphabet: 97 - 122

  // Uppercase Alphabet: 65 - 90

  // Numbers: 48 - 57

  // Special Characters: 32 - 47, 58 - 64, 91 - 96, 123 - 126
  var specialCharacters = [
    " ",
    "!",
    '"',
    "#",
    "$",
    "%",
    "&",
    "'",
    "(",
    ")",
    "*",
    "+",
    ",",
    "-",
    ".",
    "/",
    ":",
    ";",
    "<",
    "=",
    ">",
    "?",
    "@",
    "[",
    "\\",
    "]",
    "^",
    "_",
    "`",
    "{",
    "|",
    "}",
    "~",
  ];

  var passwordText = "";
  var selection = 0;
  for (i = 0; i < passwordLength; i++) {
    // debugger;
    var characterType = Math.floor(Math.random() * 4);

    switch (characterType) {
      case 0:
        // selection = Math.floor(Math.random() * alphabetLower.length);
        selection = Math.floor(Math.random() * (122 - 97 + 1) + 97);
        passwordText += String.fromCharCode(selection);
        break;
      case 1:
        // selection = Math.floor(Math.random() * alphabetUpper.length);
        selection = Math.floor(Math.random() * (90 - 65 + 1) + 65);
        passwordText += String.fromCharCode(selection);
        break;
      case 2:
        // selection = Math.floor(Math.random() * numbers.length);
        selection = Math.floor(Math.random() * (57 - 48 + 1) + 48);
        passwordText += String.fromCharCode(selection);
        break;
      case 3:
        selection = Math.floor(Math.random() * specialCharacters.length);
        passwordText += specialCharacters[selection];
        break;
      default:
        break;
    }
  }

  return passwordText;
};

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
