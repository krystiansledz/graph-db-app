import React from "react";
import { useParams } from "react-router-dom";
import {
  getMovieFromRecord,
  useActorsFromFilm,
  useDirectorsFromFilm,
  useMovie,
  useProducersFromFilm,
} from "../../query";
import { Card, CardContent, Typography } from "@mui/material";
import { PersonGroup } from "../../components/group";

const MovieDetails: React.FC = () => {
  const { id } = useParams();
  const movieState = useMovie(id);
  const directorsState = useDirectorsFromFilm(id);
  const producersState = useProducersFromFilm(id);
  const actorsState = useActorsFromFilm(id);

  if (movieState.loading) return <div>Loading ...</div>;
  if (movieState.error)
    return <div>Error: {JSON.stringify(movieState.error)}</div>;
  if (movieState.records === undefined) return null;

  const { title, releasedDate, tagline } = getMovieFromRecord(
    movieState.records![0]
  );

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h4" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Released: {releasedDate}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1.5 }}>
          {tagline}
        </Typography>

        <PersonGroup name="Directors" records={directorsState.records} />
        <PersonGroup name="Producers" records={producersState.records} />
        <PersonGroup name="Actors" records={actorsState.records} />
      </CardContent>
    </Card>
  );
};

export default MovieDetails;
