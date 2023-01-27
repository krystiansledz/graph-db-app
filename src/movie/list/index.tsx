import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import MovieCard from "../components/card";
import { getMovieFromRecord, useAllMovies } from "../../query";
import { EagerResultState } from "use-neo4j/dist/cypher";

const List = (state: EagerResultState) => {
  const { loading, error, records } = state;

  if (loading) return <div>Loading ...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  if (records === undefined) return null;

  return (
    <>
      {records.map((record) => {
        const movie = getMovieFromRecord(record);
        return <MovieCard key={movie.title} {...movie} />;
      })}
    </>
  );
};

const MovieList = () => {
  const [title, setTitle] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [limit, setLimit] = useState<string>("10");

  const state = useAllMovies({ title, year, limit });

  return (
    <Stack gap={2}>
      <Stack direction="row" gap={3}>
        <TextField
          id="outlined"
          label="Search title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <TextField
          id="outlined"
          label="Year"
          type="number"
          value={year}
          onChange={(event) => setYear(event.target.value)}
        />
        <FormControl>
          <InputLabel id="limit-label">Limit</InputLabel>
          <Select
            labelId="limit-label"
            value={limit}
            label="Limit"
            onChange={(event) => setLimit(event.target.value)}
          >
            <MenuItem value={"10"}>10</MenuItem>
            <MenuItem value={"25"}>25</MenuItem>
            <MenuItem value={"50"}>50</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <List {...state} />
    </Stack>
  );
};
export default MovieList;
