import React, { useState } from "react";
import { Box, Text, useFocus, useInput } from "ink";

type TabBarProps = {
  handleSwitchTab: (s:string) => void
}

const TabBar = (props: TabBarProps) => {
  const tabs: string[] = ["items", "categories", "orders"];
  const [tabId, setTabId] = useState<number>(0);
  const {isFocused} = useFocus({autoFocus: true});
  
  useInput((_input, key) => {
    if (!isFocused) return;
    if (key.leftArrow) {
      let id = (tabId - 1);
      if (id < 0) id = tabs.length - 1
      setTabId(id);
      props.handleSwitchTab(tabs[id]);
    } else if (key.rightArrow) {
      let id = (tabId + 1) % tabs.length
      setTabId(id);
      props.handleSwitchTab(tabs[id]); 
    }
  });

  return (
    <Box borderColor={isFocused ? "white" : "gray"} justifyContent="space-evenly" borderStyle="round">
      <Text>{isFocused ? "F" : "N" }</Text>
      {tabs.map((t, i) => <Text inverse={i === tabId} key={i}>{t}</Text>)}
    </Box>
  );
};

export default TabBar;
