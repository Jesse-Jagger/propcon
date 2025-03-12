import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" color="inherit">
            Property Connect
          </Typography>
          <div>
            <Button color="inherit" component={Link} to="/home" sx={{ marginRight: 2 }}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/properties" sx={{ marginRight: 2 }}>
              Properties
            </Button>
            <Button color="inherit" component={Link} to="/add-property">
              Add Property
            </Button>
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
