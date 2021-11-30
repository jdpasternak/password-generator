$(document).ready(function () {
  $(".modal").modal();
});

var generatePassword = function () {
  // Get password length
  var passwordLength = parseInt(getPasswordLength());

  // Get password Criteria
  var passwordCriteria = getPasswordCriteria();
  if (passwordCriteria.length === 0) {
    $(".modal").modal("open");
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

var copyPassword = function () {
  $("#password").focus().select();
  document.execCommand("copy");
  M.toast({ html: "Copied to clipboard", displayLength: 2000 });
};

var getPasswordLength = function () {
  var passwordLength = $(`input[name="length"]`).val();

  return passwordLength;
};

var getPasswordCriteria = function () {
  // Confirm with user each of the desired criteria
  /*  
  var hasLowercase = confirm("Include lowercase letters?");
  var hasUppercase = confirm("Include uppercase letters?");
  var hasNumbers = confirm("Include numbers?");
  var hasSpecial = confirm("Include special characters?"); 
  */

  // Make a list with a number for each criteria select (ex: 1,2,4 for lower, upper, and special)

  var passwordCriteria = [];
  if ($(`input[name="lowercase"]`).prop("checked")) {
    passwordCriteria.push(0);
  }
  if ($(`input[name="uppercase"]`).prop("checked")) {
    passwordCriteria.push(1);
  }
  if ($(`input[name="numbers"]`).prop("checked")) {
    passwordCriteria.push(2);
  }
  if ($(`input[name="characters"]`).prop("checked")) {
    passwordCriteria.push(3);
  }

  // If no criteria are selected, re-run the function
  /* if (passwordCriteria.length === 0) {
    $(".modal").modal("open");
    return;
  } */

  return passwordCriteria;
};

// Get references to the #generate element
var generateBtn = $("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  if (!password) {
    return false;
  }
  var passwordText = $("#password");
  var copyBtn = $("<i></i>")
    .addClass("material-icons prefix tooltipped")
    .text("content_copy")
    .attr("data-position", "top")
    .attr("data-tooltip", "Copy to clipboard")
    .on("click", copyPassword);

  $(".input-field").prepend(copyBtn);
  $(".tooltipped").tooltip();

  passwordText.val(password);
}

// Add event listener to generate button
generateBtn.on("click", writePassword);

/* New Feature with Form Inputs */
/* 
  WHEN button to Generate Password is clicked, THEN get criteria from range and checkbox inputs.
  WHEN criteria has been received, THEN iterate to generate a random letter, number, or character for the length of the password.
  WHEN a character is generated, THEN append it to a string.
  WHEN finished interating, THEN display the complete generated password in the textarea.
*/
/* 
  Pseudo Code
  - Button is clicked
  - Criteria is built by checking all checkboxes and range input
  - Criteria is sent to function that generates password
  - Password is generated and displayed in textarea.
*/
/*
  Additional Features
  - Click to copy to clipboard
  - Prompt for a name for the password to save in localStorage / otherwise
*/
