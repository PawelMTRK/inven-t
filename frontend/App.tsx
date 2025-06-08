import { Text, Box, useInput } from 'ink';
import React, { useState, useEffect } from 'react';

export const App = () => {
  const [data, setData] = useState([1, 2, 3]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async (): boolean => {
    try {
      let res = await fetch('http://localhost:3000/items')
      let data = await res.json()
      setData(data);
      setIsLoading(false);
      return true
    } catch (_e) {
      return false
    }
  }

  useEffect(() => {
    loadData()
  })

  useInput((input, key) => {
    if (input == 'q') {
      Deno.exit()
    }
    else if (input == 'r') {
      loadData()
    }
  })


  return <Box borderStyle="round" flexDirection="column">
    {
      isLoading
        ? <Text>...</Text>
        : <>
          <Text color="green">connected</Text>
          {data.map(e => <Text key={e.id}>( ) {e.name}</Text>)}
        </>
    }
  </Box>
}
