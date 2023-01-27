import React, { useEffect } from "react";
import { Button, Container, Stack } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppRoutes } from "../router/routes";

type Props = {
  to: string;
  children: string;
};

const NavButton: React.FC<Props> = ({to, children}) => {
  return (
    <Link to={to} style={{textDecoration: "none"}}>
      <Button variant="contained" size="large">
        {children}
      </Button>
    </Link>
  );
};

const Layout: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(AppRoutes.Movies());
  }, [])

  return (
    <Container fixed sx={{padding: "2rem 0"}}>
      <Stack gap={3}>
        <Stack direction="row" gap={3} justifyContent="center">
          <NavButton to={AppRoutes.Movies()}>Movies</NavButton>
          <NavButton to={AppRoutes.Persons()}>Persons</NavButton>
        </Stack>
        <Outlet/>
      </Stack>
    </Container>
  );
};

export default Layout;
