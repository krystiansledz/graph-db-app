import Record from "neo4j-driver-core/types/record";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../router/routes";
import React from "react";
import { getMovieFromRecord, getPersonFromRecord } from "../../query";

type GroupProps = {
  records: Record[] | undefined;
  name: string;
  objKey: string;
  converter: (record: Record) => {};
  route: (id: string) => string;
};

export const Group = (props: GroupProps) => {
  const { name, ...itemsProps } = props;

  return (
    <>
      {itemsProps.records && (
        <>
          <Typography variant="h5" component="div">
            {name}:
          </Typography>

          {itemsProps.records.length === 0 && <Typography>-</Typography>}

          {/*// @ts-ignore*/}
          <Items {...itemsProps} />
        </>
      )}
    </>
  );
};

type ItemsProps = Omit<GroupProps, "name"> & {
  records: Record[];
};

export const Items = ({ records, objKey, converter, route }: ItemsProps) => {
  return (
    <Typography sx={{ mb: 1.5 }} color="primary">
      {records.map((record, index, arr) => {
        const data = converter(record);
        return (
          <>
            {/*// @ts-ignore*/}
            <Link key={data[objKey]} to={route(data[objKey])}>
              {/*// @ts-ignore*/}
              {data[objKey]}
            </Link>
            {index !== arr.length - 1 && ", "}
          </>
        );
      })}
    </Typography>
  );
};

export const PersonGroup = (props: Pick<GroupProps, "name" | "records">) => {
  const { name, records } = props;

  return (
    <Group
      records={records}
      name={name}
      objKey="name"
      converter={getPersonFromRecord}
      route={AppRoutes.Person}
    />
  );
};

export const MovieGroup = (props: Pick<GroupProps, "name" | "records">) => {
  const { name, records } = props;

  return (
    <Group
      records={records}
      name={name}
      objKey="title"
      converter={getMovieFromRecord}
      route={AppRoutes.Movie}
    />
  );
};
