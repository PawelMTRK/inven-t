import React, { useState } from "react";
import { Box, Text, useInput } from "ink";

type TabBarProps = {
  handleSwitchTab: (s:string) => void
}

const TabBar = (props: TabBarProps) => {
  const tabs: string[] = ["items", "categories", "orders"];
  const [tabId, setTabId] = useState<number>(0);

  useInput((_input, key) => {
    if (key.tab) {
      let id = (key.shift ? (tabId - 1) : (tabId + 1)) % tabs.length
      if (id < 0) id = tabs.length - 1
      setTabId(id);
      props.handleSwitchTab(tabs[id]);
    }
  });

  return (
    <Box justifyContent="space-evenly" borderStyle="round">
      {tabs.map((t, i) => <Text inverse={i === tabId} key={i}>{t}</Text>)}
    </Box>
  );
};

export default TabBar;
