import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Person } from "../../types";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../router/routes";

const PersonCard: React.FC<Person> = ({ name, born }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h4" component="div">
          {name}
        </Typography>
        <Typography color="text.secondary">Born: {born}</Typography>
      </CardContent>
      <CardActions>
        <Link to={AppRoutes.Person(name)}>
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default PersonCard;
