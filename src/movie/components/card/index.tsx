import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Movie } from "../../types";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../router/routes";

const MovieCard: React.FC<Movie> = ({
  title,
  tagline,
  releasedDate,
  labels,
}) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h4" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Released: {releasedDate}
        </Typography>
        <Typography variant="body2">{tagline}</Typography>
      </CardContent>
      <CardActions>
        <Link to={AppRoutes.Movie(title)}>
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
