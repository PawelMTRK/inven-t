import React from 'react';
import { Box, Text } from "ink";
import { DataI } from "./model.ts";

type DetailsProps = {
  item: DataI
}

const Details = (props: DetailsProps) => {
  return <Box borderStyle="round" flexDirection="column" width="70%">
    {props.item !== undefined && Object
      .keys(props.item)
      .map(k => 
	<Text key={k}>{k}: {props.item[k]}</Text>
	)}
  </Box>
}

export default Details;
