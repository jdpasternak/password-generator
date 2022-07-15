export const generatePassword = function (constraints) {
  // Get password length
  var passwordLength = constraints.passwordLength;

  // Get password Criteria
  var passwordCriteria = getPasswordCriteria(constraints);
  if (passwordCriteria.length === 0) {
    return false;
  }

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
  for (let i = 0; i < passwordLength; i++) {
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

const getPasswordCriteria = function (constraints) {
  // Make a list with a number for each criteria select (ex: 1,2,4 for lower, upper, and special)
  var passwordCriteria = [];
  if (constraints.hasLowercase) {
    passwordCriteria.push(0);
  }
  if (constraints.hasUppercase) {
    passwordCriteria.push(1);
  }
  if (constraints.hasNumbers) {
    passwordCriteria.push(2);
  }
  if (constraints.hasSpecialCharacters) {
    passwordCriteria.push(3);
  }

  return passwordCriteria;
};
