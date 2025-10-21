import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Avatar,
  Chip,
  Badge,
  alpha,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import SportsIcon from "@mui/icons-material/Sports";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navigation = () => {
  const { isLoggedIn, userRole, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setDrawerOpen(false);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNavClick = () => {
    setDrawerOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  // Define navigation items
  const publicNavItems = [
    { label: "Home", path: "/", icon: <HomeIcon /> },
    { label: "About", path: "/About", icon: <InfoIcon /> },
    { label: "Contact", path: "/Contact", icon: <ContactMailIcon /> },
    { label: "Whistle", path: "/Whistle", icon: <SportsIcon /> },
  ];

  const authNavItems = isLoggedIn
    ? [
        ...(userRole === "admin"
          ? [
              {
                label: "Admin",
                path: "/admin/AdminDashboard",
                icon: <AdminPanelSettingsIcon />,
              },
            ]
          : []),
        ...(userRole === "member"
          ? [
              {
                label: "Dashboard",
                path: "/Dashboard",
                icon: <DashboardIcon />,
              },
            ]
          : []),
        { label: "Logout", action: handleLogout, icon: <LogoutIcon /> },
      ]
    : [
        { label: "Login", path: "/login", icon: <LoginIcon /> },
        { label: "Register", path: "/register", icon: <PersonAddIcon /> },
      ];

  // Mobile Drawer Content
  const drawer = (
    <Box
      sx={{
        width: 300,
        height: "100%",
        background: "linear-gradient(180deg, #0a1929 0%, #1a2332 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "200px",
          background:
            "radial-gradient(circle at 50% 0%, rgba(66, 165, 245, 0.15), transparent)",
          pointerEvents: "none",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2.5,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(66, 165, 245, 0.4)",
            }}
          >
            <SportsIcon sx={{ color: "#fff", fontSize: 20 }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "-0.5px",
            }}
          >
            Pentagon Hub
          </Typography>
        </Box>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            color: "rgba(255,255,255,0.7)",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.08)",
              color: "#fff",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {isLoggedIn && (
        <Box
          sx={{
            p: 2.5,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "2px solid rgba(255,255,255,0.1)",
              }}
            >
              <AccountCircleIcon />
            </Avatar>
            <Box>
              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                }}
              >
                Welcome Back!
              </Typography>
              <Chip
                label={userRole}
                size="small"
                sx={{
                  height: 20,
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  background:
                    userRole === "admin"
                      ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                      : "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  color: "#fff",
                  border: "none",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              />
            </Box>
          </Box>
        </Box>
      )}

      <List sx={{ px: 1.5, py: 2 }}>
        <Typography
          sx={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.7rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
            px: 2,
            py: 1,
          }}
        >
          Navigation
        </Typography>
        {publicNavItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={handleNavClick}
              sx={{
                borderRadius: 2,
                color: isActive(item.path)
                  ? "#fff"
                  : "rgba(255,255,255,0.7)",
                backgroundColor: isActive(item.path)
                  ? "rgba(66, 165, 245, 0.15)"
                  : "transparent",
                border: isActive(item.path)
                  ? "1px solid rgba(66, 165, 245, 0.3)"
                  : "1px solid transparent",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "rgba(66, 165, 245, 0.1)",
                  transform: "translateX(4px)",
                  color: "#fff",
                },
              }}
            >
              <Box
                sx={{
                  mr: 2,
                  display: "flex",
                  alignItems: "center",
                  color: isActive(item.path) ? "#42a5f5" : "inherit",
                }}
              >
                {item.icon}
              </Box>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: isActive(item.path) ? 600 : 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}

        <Divider
          sx={{ my: 2, backgroundColor: "rgba(255,255,255,0.08)" }}
        />

        <Typography
          sx={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.7rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
            px: 2,
            py: 1,
          }}
        >
          Account
        </Typography>
        {authNavItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={item.path ? Link : "button"}
              to={item.path}
              onClick={item.action || handleNavClick}
              sx={{
                borderRadius: 2,
                color: isActive(item.path)
                  ? "#fff"
                  : "rgba(255,255,255,0.7)",
                backgroundColor: isActive(item.path)
                  ? "rgba(66, 165, 245, 0.15)"
                  : "transparent",
                border: isActive(item.path)
                  ? "1px solid rgba(66, 165, 245, 0.3)"
                  : "1px solid transparent",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor:
                    item.label === "Logout"
                      ? "rgba(244, 67, 54, 0.1)"
                      : "rgba(66, 165, 245, 0.1)",
                  transform: "translateX(4px)",
                  color: item.label === "Logout" ? "#f44336" : "#fff",
                },
              }}
            >
              <Box
                sx={{
                  mr: 2,
                  display: "flex",
                  alignItems: "center",
                  color:
                    item.label === "Logout"
                      ? "#f44336"
                      : isActive(item.path)
                      ? "#42a5f5"
                      : "inherit",
                }}
              >
                {item.icon}
              </Box>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: isActive(item.path) ? 600 : 500,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={scrolled ? 4 : 0}
        sx={{
          background: scrolled
            ? "rgba(10, 25, 41, 0.95)"
            : "linear-gradient(135deg, rgba(10, 25, 41, 0.98) 0%, rgba(26, 35, 50, 0.98) 100%)",
          backdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(66, 165, 245, 0.1)"
            : "1px solid rgba(255,255,255,0.05)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 2, sm: 3, md: 4 },
            py: 1.5,
          }}
        >
          {/* Logo Section */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            <Box
              sx={{
                width: { xs: 36, sm: 40 },
                height: { xs: 36, sm: 40 },
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 16px rgba(66, 165, 245, 0.4)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "200%",
                  height: "200%",
                  background:
                    "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
                  animation: "shine 3s infinite",
                },
                "@keyframes shine": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" },
                },
              }}
            >
              <SportsIcon
                sx={{ color: "#fff", fontSize: { xs: 20, sm: 24 } }}
              />
            </Box>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" },
                background:
                  "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: { xs: "none", sm: "block" },
              }}
            >
              Pentagon RollerSkating Hub
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                fontSize: "0.95rem",
                background:
                  "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: { xs: "block", sm: "none" },
              }}
            >
              Pentagon Hub
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {publicNavItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  startIcon={item.icon}
                  sx={{
                    color: isActive(item.path)
                      ? "#fff"
                      : "rgba(255,255,255,0.7)",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    textTransform: "none",
                    position: "relative",
                    backgroundColor: isActive(item.path)
                      ? "rgba(66, 165, 245, 0.15)"
                      : "transparent",
                    border: isActive(item.path)
                      ? "1px solid rgba(66, 165, 245, 0.3)"
                      : "1px solid transparent",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      backgroundColor: "rgba(66, 165, 245, 0.15)",
                      transform: "translateY(-2px)",
                      color: "#fff",
                    },
                    "&::after": isActive(item.path)
                      ? {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "60%",
                          height: "2px",
                          background:
                            "linear-gradient(90deg, transparent, #42a5f5, transparent)",
                          borderRadius: "2px",
                        }
                      : {},
                  }}
                >
                  {item.label}
                </Button>
              ))}

              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  mx: 1,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  height: "24px",
                  alignSelf: "center",
                }}
              />

              {isLoggedIn && (
                <IconButton
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&:hover": {
                      backgroundColor: "rgba(66, 165, 245, 0.1)",
                      color: "#fff",
                    },
                  }}
                >
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              )}

              {authNavItems.map((item) => (
                <Button
                  key={item.label}
                  component={item.path ? Link : "button"}
                  to={item.path}
                  onClick={item.action}
                  startIcon={item.icon}
                  variant={
                    item.label === "Register" || item.label === "Logout"
                      ? "contained"
                      : "text"
                  }
                  sx={{
                    color:
                      item.label === "Register" || item.label === "Logout"
                        ? "#fff"
                        : isActive(item.path)
                        ? "#fff"
                        : "rgba(255,255,255,0.7)",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    px: 2.5,
                    py: 1,
                    borderRadius: 2,
                    textTransform: "none",
                    background:
                      item.label === "Register"
                        ? "linear-gradient(135deg, #42a5f5 0%, #1976d2 100%)"
                        : item.label === "Logout"
                        ? "linear-gradient(135deg, #f44336 0%, #d32f2f 100%)"
                        : isActive(item.path)
                        ? "rgba(66, 165, 245, 0.15)"
                        : "transparent",
                    border:
                      item.label === "Register" || item.label === "Logout"
                        ? "none"
                        : isActive(item.path)
                        ? "1px solid rgba(66, 165, 245, 0.3)"
                        : "1px solid transparent",
                    boxShadow:
                      item.label === "Register"
                        ? "0 4px 12px rgba(66, 165, 245, 0.3)"
                        : item.label === "Logout"
                        ? "0 4px 12px rgba(244, 67, 54, 0.3)"
                        : "none",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      backgroundColor:
                        item.label === "Register"
                          ? "#1976d2"
                          : item.label === "Logout"
                          ? "#d32f2f"
                          : "rgba(66, 165, 245, 0.15)",
                      transform: "translateY(-2px)",
                      boxShadow:
                        item.label === "Register"
                          ? "0 6px 20px rgba(66, 165, 245, 0.4)"
                          : item.label === "Logout"
                          ? "0 6px 20px rgba(244, 67, 54, 0.4)"
                          : "none",
                      color: "#fff",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {isLoggedIn && (
                <IconButton
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&:hover": {
                      backgroundColor: "rgba(66, 165, 245, 0.1)",
                      color: "#fff",
                    },
                  }}
                >
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              )}
              <IconButton
                edge="end"
                onClick={handleDrawerToggle}
                sx={{
                  color: "#fff",
                  backgroundColor: "rgba(66, 165, 245, 0.15)",
                  border: "1px solid rgba(66, 165, 245, 0.3)",
                  "&:hover": {
                    backgroundColor: "rgba(66, 165, 245, 0.25)",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navigation;