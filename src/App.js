import { useState } from "react";
import { ContentCopyOutlined, Close, Add, Remove } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Container,
  Switch,
  FormControlLabel,
  Grid,
  Button,
  Tooltip,
  IconButton,
  Snackbar,
  Slider,
  Input,
} from "@mui/material";
import { generatePassword } from "./utils";

function App() {
  const [constraints, setConstraints] = useState({
    hasLowercase: true,
    hasUppercase: true,
    hasNumbers: true,
    hasSpecialCharacters: true,
    passwordLength: 20,
  });
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const updateConstraints = (property, value) => {
    const tempConstraints = { ...constraints };
    tempConstraints[property] = value;
    setConstraints(tempConstraints);
  };

  const handleClickGenerate = (event) => {
    const passwordText = generatePassword(constraints);
    if (passwordText) {
      setGeneratedPassword(passwordText);
    } else {
      setMessage("Select at least one constraint");
      setOpen(true);
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    console.log(event.target);
    console.log(name);
    if (name === "passwordLength") {
      updateConstraints(name, event.target.value);
    } else {
      updateConstraints(name, event.target.checked);
    }
  };

  const handleClickCopy = (event) => {
    document.querySelector('[name="generatedPassword"]').select();
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(generatedPassword);
      setOpen(true);
      setMessage("Copied to clipboard");
    }
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  const handleBlur = () => {
    if (constraints.passwordLength < 1) {
      updateConstraints("passwordLength", 1);
    } else if (constraints.passwordLength > 128) {
      updateConstraints("passwordLength", 128);
    }
  };

  return (
    <>
      <Container role="main">
        <Typography variant="h1" component="h1" sx={{ textAlign: "center" }}>
          Password Generator
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h2" sx={{ textAlign: "center" }}>
              Generate a Password
            </Typography>
            <Box sx={{ width: "100%" }} display="flex">
              <Tooltip title="Copy to clipboard">
                <IconButton
                  sx={{ marginRight: "1rem" }}
                  onClick={handleClickCopy}
                >
                  <ContentCopyOutlined />
                </IconButton>
              </Tooltip>
              <TextField
                variant="standard"
                placeholder="Your Secure Password"
                value={generatedPassword}
                name="generatedPassword"
                sx={{ flex: "1" }}
                readOnly
              />
            </Box>
            <Typography gutterBottom>Password Length</Typography>
            <Grid container>
              <Grid item xs={1} sx={{ textAlign: "center" }}>
                <IconButton
                  onClick={() => {
                    updateConstraints(
                      "passwordLength",
                      constraints.passwordLength - 1 < 1
                        ? 1
                        : constraints.passwordLength - 1
                    );
                  }}
                  aria-label="decrement password length"
                >
                  <Remove />
                </IconButton>
              </Grid>
              <Grid item xs={9} sx={{ textAlign: "center" }}>
                <Slider
                  aria-label="password length"
                  value={constraints.passwordLength}
                  onChange={handleChange}
                  name="passwordLength"
                  valueLabelDisplay="auto"
                  min={1}
                  max={128}
                />
              </Grid>
              <Grid item xs={1} sx={{ textAlign: "center" }}>
                <IconButton
                  onClick={() => {
                    updateConstraints(
                      "passwordLength",
                      constraints.passwordLength + 1 > 128
                        ? 128
                        : constraints.passwordLength + 1
                    );
                  }}
                  aria-label="increment password length"
                >
                  <Add />
                </IconButton>
              </Grid>
              <Grid item xs={1} sx={{ textAlign: "center" }}>
                <Input
                  value={constraints.passwordLength}
                  size="small"
                  onChange={handleChange}
                  name="passwordLength"
                  onBlur={handleBlur}
                  inputProps={{ min: 1, max: 128, type: "number" }}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      checked={constraints.hasLowercase}
                      onChange={handleChange}
                      name="hasLowercase"
                    />
                  }
                  label="Lowercase Letters"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      checked={constraints.hasUppercase}
                      onChange={handleChange}
                      name="hasUppercase"
                    />
                  }
                  label="Uppercase Letters"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      checked={constraints.hasNumbers}
                      onChange={handleChange}
                      name="hasNumbers"
                    />
                  }
                  label="Numbers"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      checked={constraints.hasSpecialCharacters}
                      onChange={handleChange}
                      name="hasSpecialCharacters"
                    />
                  }
                  label="Special Characters"
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={handleClickGenerate}>Generate</Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={message}
        action={
          <IconButton
            onClick={handleClose}
            color="inherit"
            aria-label="close"
            size="small"
          >
            <Close />
          </IconButton>
        }
      />
    </>
  );
}

export default App;
