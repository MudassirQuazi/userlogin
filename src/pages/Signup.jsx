import { useState } from "react";
import InputField from "../components/InputField";
import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Divider,
  Link
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const Signup = ({ switchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      alert("User already exists");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful");
    switchToLogin();
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ width: 380, p: 3, borderRadius: 3 }}>
        <Box textAlign="center" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            Create Account
          </Typography>
          <Typography color="text.secondary">
            Sign up to start ordering
          </Typography>
        </Box>

        <form onSubmit={handleSignup}>
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Email / Phone"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              bgcolor: "orange",
              color: "white",
              py: 1.2,
              mt: 1,
              "&:hover": { bgcolor: "#e65100" }
            }}
          >
            Sign Up
          </Button>
        </form>

        <Divider sx={{ my: 2 }} />

        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
        >
          Continue with Google
        </Button>

        <Typography textAlign="center" mt={2}>
          Already have an account?
          <Link
            onClick={switchToLogin}
            sx={{ color: "orange", cursor: "pointer", ml: 1 }}
          >
            Login
          </Link>
        </Typography>
      </Card>
    </Box>
  );
};

export default Signup;
