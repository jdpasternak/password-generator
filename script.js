// Assignment code here
var generatePassword = function () {
  // Get password length
  var passwordLength = getPasswordLength();

  // Get password Criteria
  var passwordCriteria = getPasswordCriteria();

  /* Decimal representations of possible password characters 
      ALL possible characers: 32 - 126
        Lowercase Alphabet: 97 - 122
        Uppercase Alphabet: 65 - 90
        Numbers: 48 - 57
        Special Characters: 32 - 47, 58 - 64, 91 - 96, 123 - 126 */
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

  // Randomly select a type from one of the chosen criteria, then randomly select a character from that type
  var passwordText = "";
  var selection = 0;
  for (i = 0; i < passwordLength; i++) {
    // debugger;

    // Keep running this switch statement until randomly landing on one of the selected criteria
    var selected = false;
    while (!selected) {
      var characterType = Math.floor(Math.random() * 4);
      if (passwordCriteria.includes(characterType)) {
        switch (characterType) {
          case 0:
            selection = Math.floor(Math.random() * (122 - 97 + 1) + 97);
            passwordText += String.fromCharCode(selection);
            break;
          case 1:
            selection = Math.floor(Math.random() * (90 - 65 + 1) + 65);
            passwordText += String.fromCharCode(selection);
            break;
          case 2:
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
        selected = true;
      }
    }
  }
  return passwordText;
};

var getPasswordLength = function () {
  // Prompt the user for desired password legnth
  var passwordLength = parseInt(
    prompt("Enter a password length from 8 to 128 characters.")
  );

  // If the password does not satisfy the length requirements, or is NaN, re-run the function
  if (passwordLength < 8 || passwordLength > 128 || isNaN(passwordLength)) {
    alert("ERROR: Must enter a value between 8 and 128.");
    return getPasswordLength();
  }

  return passwordLength;
};

var getPasswordCriteria = function () {
  // Confirm with user each of the desired criteria
  var hasLowercase = confirm("Include lowercase letters?");
  var hasUppercase = confirm("Include uppercase letters?");
  var hasNumbers = confirm("Include numbers?");
  var hasSpecial = confirm("Include special characters?");

  // Make a list with a number for each criteria select (ex: 1,2,4 for lower, upper, and special)
  var passwordCriteria = [];
  if (hasLowercase) {
    passwordCriteria.push(0);
  }
  if (hasUppercase) {
    passwordCriteria.push(1);
  }
  if (hasNumbers) {
    passwordCriteria.push(2);
  }
  if (hasSpecial) {
    passwordCriteria.push(3);
  }
  // If no criteria are selected, re-run the function
  if (passwordCriteria.length === 0) {
    alert("ERROR: You must select at least 1 of the criteria.");
    return getPasswordCriteria();
  }

  return passwordCriteria;
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
