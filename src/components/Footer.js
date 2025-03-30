import React, { useContext } from "react";
import { Box, Typography, Link } from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";

const Footer = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <Box
      sx={{
        bgcolor: darkMode ? "#2F4F4F" : "primary.dark",
        color: "white",
        p: 2,
        mt: 4,
        textAlign: "center",
      }}
    >
      <Typography variant="body1">
        © {new Date().getFullYear()} E-commerce Store. All rights reserved.
      </Typography>
      <Typography variant="body2">
        Designed by{" "}
        <Link
          href="https://www.linkedin.com/in/rinkoo2000/"
          color="inherit"
          underline="hover"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rinkoo
        </Link>{" "}
        | For more info, contact us at{" "}
        <Link
          href="https://mail.google.com/mail/?view=cm&fs=1&to=rinkookandpal1966@gmail.com"
          color="inherit"
          underline="hover"
          target="_blank"
          rel="noopener noreferrer"
        >
          rinkookandpal1966@gmail.com
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
