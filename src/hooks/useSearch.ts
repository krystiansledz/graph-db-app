import { useReadCypher } from "use-neo4j";
import { useEffect } from "react";
import { EagerResultState } from "use-neo4j/dist/cypher";

export const useSearch = (
  cypher: string,
  params: Record<string, unknown>
): EagerResultState => {
  const resultState = useReadCypher(cypher, params);

  useEffect(() => {
    resultState.run(params);
  }, [params]);

  return resultState;
};
