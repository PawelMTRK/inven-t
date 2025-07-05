import { Box, Text, useInput } from "ink";
import React, { useEffect, useState } from "react";
import TabBar from "./TabBar.tsx";
import { Data } from "./model.ts"
import Sidebar from "./Sidebar.tsx";
import Details from "./Details.tsx";

export const App = () => {
  const url = "http://localhost:3000/";
  const [data, setData] = useState<Data[]>([]);
  const [itemId, setItemId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFailed, setIsFailed] = useState<boolean>(true);

  const onSwitchTab = (name: string) => {
    setIsLoading(true);
    loadData(name);
  };

  const onSwitchItem = (id: number) => {
    setItemId(id);
  }

  const loadData = async (name: string) => {
    try {
      const res = await fetch(url + name);
      const data = await res.json();
      setData(data);
      setIsFailed(false);
      setIsLoading(false);
      // this works instead of putting it in onSwitchTab
      setItemId(0);
    } catch (_e) {
      setIsFailed(true);
    }
  };

  useEffect(() => {
    loadData("items");
  }, [])
  
  useInput((input, _key) => {
    if (input == "q") {
      Deno.exit();
    }
  });

  return (
    <Box flexDirection="column">
      {isFailed ? <Text>No connection</Text> : <TabBar handleSwitchTab={onSwitchTab} />}
    {isLoading
      ? <Text>...</Text>
      : <Box flexDirection="row">
      <Sidebar handleSwitchItem={onSwitchItem} data={data} />
      <Details item={data[itemId]} />
      </Box>
      }
    </Box>
  );
};
