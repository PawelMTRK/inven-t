import React, { useState } from 'react';
import { Box, Text, useInput } from "ink";
import { Data, getLabel } from "./model.ts";

type SidebarProps = {
  data: Data[]
}

const Sidebar = (props: SidebarProps) => {
  const [itemId, setItemId] = useState<number>(0);

  useInput((_input, key) => {
    let id = itemId;
    if (key.upArrow) {
      id -= 1;
    } else if (key.downArrow) {
      id += 1
    }
    if (id < 0) id = props.data.length - 1
    setItemId(id % props.data.length)
  })
  
  return <Box borderStyle="round" flexDirection="column" width="30%">
    {props.data.map((e, i) => <Text color={i === itemId ? "white" : "gray"} key={e.id}> {e.id}) {getLabel(e)}</Text>)}
  </Box>
}

export default Sidebar;
