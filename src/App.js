import { ContentCopyOutlined } from "@mui/icons-material";
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
} from "@mui/material";

function App() {
  return (
    <>
      <Container>
        <Typography variant="h1" component="h1" sx={{ textAlign: "center" }}>
          Password Generator
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h2" sx={{ textAlign: "center" }}>
              Generate a Password
            </Typography>
            <Box sx={{ width: "100%" }} display="flex">
              <ContentCopyOutlined />
              <TextField
                variant="standard"
                placeholder="Your Secure Password"
                sx={{
                  width: "100%",
                  textAlign: "center",
                  display: "inline-block",
                }}
                readOnly
              ></TextField>
            </Box>
            <Grid container justifyContent="center">
              <Grid item>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Lowercase Letters"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Uppercase Letters"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Numbers"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Special Characters"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default App;
