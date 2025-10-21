import React, { useMemo } from "react";
import { Box, Typography, Button, useTheme, useMediaQuery } from "@mui/material";
import { keyframes } from "@emotion/react";
import { Link } from "react-router-dom";

// Floating animation
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

// Floating element component
const FloatingDot = ({ size, color, top, bottom, left, right, duration }) => (
  <Box
    sx={{
      position: "absolute",
      top,
      bottom,
      left,
      right,
      width: size,
      height: size,
      bgcolor: color,
      borderRadius: "50%",
      animation: `${float} ${duration}s ease-in-out infinite`,
      filter: `blur(${size / 5}px)`,
      zIndex: 1,
    }}
  />
);

const Home = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  // Memoized floating dots for performance
  const floatingDots = useMemo(
    () => [
      { size: 25, color: "#9b59b6", top: "15%", left: "10%", duration: 5 },
      { size: 30, color: "#3498db", bottom: "25%", right: "15%", duration: 6 },
      { size: 20, color: "#e74c3c", top: "40%", right: "20%", duration: 7 },
    ],
    []
  );

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {/* Video Background */}
      <video
        src="/rain.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 1,
        }}
      />

      {/* Centered Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          gap: { xs: 4, sm: 6 },
          px: { xs: 2, sm: 6 },
        }}
      >
        <Typography
          variant={isSm ? "h4" : "h2"}
          sx={{
            color: "#fff",
            fontWeight: "bold",
            textShadow: "2px 2px 15px rgba(0,0,0,0.7)",
          }}
        >
          Pentagon Roller Skating Hub
        </Typography>

        <Typography
          variant={isSm ? "body1" : "h5"}
          sx={{
            color: "rgba(255,255,255,0.9)",
            maxWidth: 600,
            textShadow: "1px 1px 10px rgba(0,0,0,0.5)",
          }}
        >
          Experience, Live, Love Skating!
        </Typography>

        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #8e2de2, #4a00e0)",
              color: "#fff",
              px: { xs: 3, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              fontSize: { xs: "0.9rem", sm: "1.1rem" },
              boxShadow: "0 0 20px rgba(255,255,255,0.5)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 0 30px rgba(255,255,255,0.8)",
                background: "linear-gradient(45deg, #4a00e0, #8e2de2)",
              },
            }}
          >
            Get Started
          </Button>
        </Link>
      </Box>

      {/* Floating Neon Elements */}
      {floatingDots.map((dot, index) => (
        <FloatingDot key={index} {...dot} />
      ))}
    </Box>
  );
};

export default Home;
