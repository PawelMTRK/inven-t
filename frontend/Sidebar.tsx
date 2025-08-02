import React, { useState } from 'react';
import { Box, Text, useFocus, useFocusManager, useInput } from "ink";
import { Data, getLabel } from "./model.ts";

type SidebarProps = {
  data: Data[],
  handleSwitchItem: (id: number) => void
}

const Sidebar = (props: SidebarProps) => {
  const [itemId, setItemId] = useState<number>(0);
  const {isFocused} = useFocus({id: "sidebar"});
  const {focus} = useFocusManager();

  useInput((_input, key) => {
    if (!isFocused) return;
    if (key.return) {
      focus("details");
    }
    let id = itemId;
    if (key.upArrow) {
      id -= 1;
    } else if (key.downArrow) {
      id += 1
    }
    if (id < 0) id = props.data.length - 1
    setItemId(id % props.data.length)
    props.handleSwitchItem(id % props.data.length)
  })
  
  return <Box borderColor={isFocused ? "white" : "gray"} borderStyle="round" flexDirection="column" width="30%">
    <Text>{isFocused ? "F" : "N" }</Text>
    {props.data.map((e, i) => <Text color={i === itemId ? "white" : "gray"} key={e.id}> {e.id}) {getLabel(e)}</Text>)}
  </Box>
}

export default Sidebar;
