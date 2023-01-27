import React from "react";
import { useParams } from "react-router-dom";
import {
  getPersonFromRecord,
  useFilmsFromActor,
  useFilmsFromDirector,
  useFilmsFromProducer,
  usePerson,
  usePersonFollowedByPersons,
  usePersonsFollowedByPerson,
} from "../../query";
import { Card, CardContent, Typography } from "@mui/material";
import { MovieGroup, PersonGroup } from "../../components/group";

const PersonDetails: React.FC = () => {
  const { id } = useParams();
  const personState = usePerson(id);
  const directorsState = useFilmsFromDirector(id);
  const producersState = useFilmsFromProducer(id);
  const actorsState = useFilmsFromActor(id);
  const followsState = usePersonsFollowedByPerson(id);
  const followedByState = usePersonFollowedByPersons(id);

  if (personState.loading) return <div>Loading ...</div>;
  if (personState.error)
    return <div>Error: {JSON.stringify(personState.error)}</div>;
  if (personState.records === undefined) return null;

  const { name, born } = getPersonFromRecord(personState.records![0]);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h4" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Born: {born}
        </Typography>

        <MovieGroup name="Directed" records={directorsState.records} />
        <MovieGroup name="Produced" records={producersState.records} />
        <MovieGroup name="Acted in" records={actorsState.records} />
        <PersonGroup name="Follows" records={followsState.records} />
        <PersonGroup name="Followed by" records={followedByState.records} />
      </CardContent>
    </Card>
  );
};

export default PersonDetails;
