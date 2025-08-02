import React from 'react';
import { Box, Text, useFocus, useFocusManager, useInput } from "ink";

type DetailsProps = {
  item: object & {[key: string]: string|number}
}

const Details = (props: DetailsProps) => {
  const {isFocused} = useFocus({id: "details", isActive: false});
  const {focus} = useFocusManager();

  useInput((_input, key) => {
    if (!isFocused) return;
    if (key.escape) {
      focus("sidebar");
    }
  })
  
  return <Box borderColor={isFocused ? "white" : "gray"} borderStyle="round" flexDirection="column" width="70%">
    {props.item !== undefined && Object
      .keys(props.item)
      .map(k => 
	<Text key={k}>{k}: {props.item[k]}</Text>
	)}
  </Box>
}

export default Details;
