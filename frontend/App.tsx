import { Box, Text, useInput } from "ink";
import React, { useEffect, useState } from "react";

export const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);\

  const loadData = async () => {
    try {
      const res = await fetch("http://localhost:3000/items");
      const data = await res.json();
      setData(data);
      setIsFailed(false);
      setIsLoading(false);
    } catch (_e) {
      setIsFailed(true);
    }
  };

  useEffect(() => {
    loadData();
  });

  useInput((input, key) => {
    if (input == "q") {
      Deno.exit();
    } else if (input == "r") {
      loadData();
    }
  });

  return (
    <Box borderStyle="round" flexDirection="column">
      {isLoading || isFailed ? <Text>...</Text> : (
        <>
          <Text color="green">connected</Text>
          {data.map((e) => <Text key={e.id}>( ) {e.name}</Text>)}
        </>
      )}
    </Box>
  );
};
