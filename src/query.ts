import {useSearch} from "./hooks/useSearch";
import {EagerResultState} from "use-neo4j/dist/cypher";
import neo4j from "neo4j-driver";
import Record from "neo4j-driver-core/types/record";
import {Movie} from "./movie/types";
import {useMemo} from "react";
import {Person} from "./person/types"; // movies

// movies

type AllMoviesParams = {
  title: string;
  year: string;
  limit: string;
};

export const useAllMovies = (params: AllMoviesParams): EagerResultState => {
  const { title, year, limit } = params;

  const parsedParams = useMemo(() => {
    return {
      title,
      year: year ? neo4j.int(year) : undefined,
      limit: neo4j.int(limit),
    };
  }, [title, year, limit]);

  const cypher = `MATCH (n:Movie) WHERE n.title CONTAINS $title ${
    year ? "AND n.released = $year" : ""
  } RETURN n ORDER BY n.title LIMIT $limit`;

  return useSearch(cypher, parsedParams);
};

export const useMovie = (title?: string): EagerResultState => {
  const parsedParams = useMemo(() => {
    return {
      title,
    };
  }, [title]);

  const cypher = `MATCH (n:Movie) WHERE n.title = $title RETURN n`;

  return useSearch(cypher, parsedParams);
};

export const getMovieFromRecord = (record: Record): Movie => {
  const data = record.get("n");

  return {
    title: data.properties.title,
    tagline: data.properties.tagline,
    labels: data.labels,
    releasedDate: data.properties.released.low,
  };
};

// persons

type AllPersonsParams = {
  name: string;
  born: string;
  limit: string;
};

export const useAllPersons = (params: AllPersonsParams): EagerResultState => {
  const { name, born, limit } = params;

  const parsedParams = useMemo(() => {
    return {
      name,
      year: born ? neo4j.int(born) : undefined,
      limit: neo4j.int(limit),
    };
  }, [name, born, limit]);

  const cypher = `MATCH (n:Person) WHERE n.name CONTAINS $name ${
    born ? "AND n.born = $born" : ""
  } RETURN n ORDER BY n.name LIMIT $limit`;

  return useSearch(cypher, parsedParams);
};

export const usePerson = (name?: string): EagerResultState => {
  const parsedParams = useMemo(() => {
    return {
      name,
    };
  }, [name]);

  const cypher = `MATCH (n:Person) WHERE n.name = $name RETURN n`;

  return useSearch(cypher, parsedParams);
};

export const getPersonFromRecord = (record: Record): Person => {
  const data = record.get("n");

  return {
    name: data.properties.name,
    labels: data.labels,
    born: data.properties.born?.low,
  };
};

// relations

export const useDirectorsFromFilm = (title?: string) => {
  const parsedParams = useMemo(() => {
    return {
      title,
    };
  }, [title]);

  const cypher = `MATCH (m:Movie WHERE m.title = $title)<-[:DIRECTED]-(n:Person)
RETURN n`;

  return useSearch(cypher, parsedParams);
};

export const useProducersFromFilm = (title?: string) => {
  const parsedParams = useMemo(() => {
    return {
      title,
    };
  }, [title]);

  const cypher = `MATCH (m:Movie WHERE m.title = $title)<-[:PRODUCED]-(n:Person)
RETURN n`;

  return useSearch(cypher, parsedParams);
};

export const useActorsFromFilm = (title?: string) => {
  const parsedParams = useMemo(() => {
    return {
      title,
    };
  }, [title]);

  const cypher = `MATCH (m:Movie WHERE m.title = $title)<-[:ACTED_IN]-(n:Person)
RETURN n`;

  return useSearch(cypher, parsedParams);
};

export const useFilmsFromDirector = (name?: string) => {
  const parsedParams = useMemo(() => {
    return {
      name,
    };
  }, [name]);

  const cypher = `MATCH (p:Person WHERE p.name = $name)-[:DIRECTED]->(n:Movie)
RETURN n`;

  return useSearch(cypher, parsedParams);
};

export const useFilmsFromProducer = (name?: string) => {
  const parsedParams = useMemo(() => {
    return {
      name,
    };
  }, [name]);

  const cypher = `MATCH (p:Person WHERE p.name = $name)-[:PRODUCED]->(n:Movie)
RETURN n`;

  return useSearch(cypher, parsedParams);
};

export const useFilmsFromActor = (name?: string) => {
  const parsedParams = useMemo(() => {
    return {
      name,
    };
  }, [name]);

  const cypher = `MATCH (p:Person WHERE p.name = $name)-[:ACTED_IN]->(n:Movie)
RETURN n`;

  return useSearch(cypher, parsedParams);
};

export const usePersonsFollowedByPerson = (name?: string) => {
  const parsedParams = useMemo(() => {
    return {
      name,
    };
  }, [name]);

  const cypher = `MATCH (p:Person WHERE p.name = $name)-[:FOLLOWS]->(n:Person)
RETURN n`;

  return useSearch(cypher, parsedParams);
};

export const usePersonFollowedByPersons = (name?: string) => {
  const parsedParams = useMemo(() => {
    return {
      name,
    };
  }, [name]);

  const cypher = `MATCH (p:Person WHERE p.name = $name)<-[:FOLLOWS]-(n:Person)
RETURN n`;

  return useSearch(cypher, parsedParams);
};
