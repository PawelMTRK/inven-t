import { Box, Text, useInput } from "ink";
import React, { useState } from "react";
import TabBar from "./TabBar.tsx";
import { Data, getLabel } from "./model.ts"

export const App = () => {
  const url = "http://localhost:3000/";
  const [data, setData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFailed, setIsFailed] = useState<boolean>(false);

  const onSwitchTab = (name: string) => {
    setIsLoading(true);
    loadData(name);
  };

  const loadData = async (name: string) => {
    try {
      const res = await fetch(url + name);
      const data = await res.json();
      setData(data);
      setIsFailed(false);
      setIsLoading(false);
    } catch (_e) {
      setIsFailed(true);
    }
  };

  useInput((input, key) => {
    if (input == "q") {
      Deno.exit();
    }
  });

  return (
    <Box flexDirection="column">
      <TabBar handleSwitchTab={onSwitchTab} />
      {isLoading || isFailed ? <Text>...</Text> : (
        <>
          {data.map(e => <Text key={e.id}> - {getLabel(e)}</Text>)}
        </>
      )}
    </Box>
  );
};
