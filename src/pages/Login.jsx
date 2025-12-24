import { useState } from "react";
import InputField from "../components/InputField";

//MUI imports
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Divider,
  Link
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

//login components
const Login = ({ switchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openForgot, setOpenForgot] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  
  //password validation function
  const isValidPassword = (password) => {
  if (password.length < 6) return false;
   const hasNumber = /\d/.test(password);
   const hasLetter = /[a-zA-Z]/.test(password);
   return hasNumber && hasLetter;
  };
  
  //forgot password logic
  const handleResetPassword = () => {
  if (!resetEmail || !newPassword) {
    alert("All fields are required");
    return;
  }

  if (!isValidPassword(newPassword)) {
    alert("Password must be at least 6 characters with letters and numbers");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userIndex = users.findIndex((u) => u.email === resetEmail);

  if (userIndex === -1) {
    alert("Email not found");
    return;
  }

  users[userIndex].password = newPassword;
  localStorage.setItem("users", JSON.stringify(users));

  alert("Password reset successful");

  setOpenForgot(false);
  setResetEmail("");
  setNewPassword("");
  };


  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!validUser) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem("authToken", "logged-in");
    localStorage.setItem("loggedUser", JSON.stringify(validUser));

    alert(`Welcome ${validUser.name}`);
  };

  return (
    <>
      {/*Main login card*/}
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
       <Card sx={{ width: 380, p: 3, borderRadius: 3 }}>
        <Box textAlign="center" mb={2}>
          <Typography variant="h5" fontWeight="bold">
            Welcome Back!
          </Typography>
          <Typography color="text.secondary">
            Login to order your favorite food
          </Typography>
        </Box>

        <form onSubmit={handleLogin}>
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
          
          {/*Forgot password link*/}
          <Box textAlign="right" mb={2}>
            <Link
              underline="none"
              sx={{ color: "orange", cursor: "pointer" }}
              onClick={() => setOpenForgot(true)}
            >
              Forgot Password?
            </Link>

          </Box>

          <Button
            type="submit"
            fullWidth
            sx={{
              bgcolor: "orange",
              color: "white",
              py: 1.2,
              "&:hover": { bgcolor: "#e65100" }
            }}
          >
            Login
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
          Don&apos;t have an account?
          <Link
            onClick={switchToSignup}
            sx={{ color: "orange", cursor: "pointer", ml: 1 }}
           >
             Sign Up
           </Link>
         </Typography>
       </Card>
     </Box>
    {/* STEP 6: FORGOT PASSWORD DIALOG */}
    <Dialog open={openForgot} onClose={() => setOpenForgot(false)}>
    <DialogTitle>Reset Password</DialogTitle>

    <DialogContent>
      <TextField
        label="Registered Email"
        fullWidth
        value={resetEmail}
        margin="normal"
        onChange={(e) => setResetEmail(e.target.value)}
        />

          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenForgot(false)}>Cancel</Button>
          <Button
            onClick={handleResetPassword}
            sx={{ bgcolor: "orange", color: "white" }}
            >
            Reset
          </Button>
        </DialogActions>
      </Dialog>
   
   </>
  );
};

export default Login;