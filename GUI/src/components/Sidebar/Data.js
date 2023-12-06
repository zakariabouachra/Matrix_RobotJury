import { Box, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const statusColors = {
  'Published': 'green',
  'Rejected': 'red',
  'In process': 'blue',
  'Verified': 'yellow',
  'Paid':'green'
};

function Data() {
  const [statusCounts, setStatusCounts] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem('articlesData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      const counts = {};
      parsedData.forEach((item) => {
        counts[item.status] = counts[item.status] ? counts[item.status] + 1 : 1;
      });

      setStatusCounts(counts);
    }
  }, []);

  return (
    <VStack as="ul" spacing={0} listStyleType="none" width="100%">
      {Object.keys(statusCounts).map((status) => (
        <Box
          key={status}
          as="li"
          width="100%"
          py={3}
          px={5}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth={1}
          borderColor="brand.light"
        >
          <Text color="brand.dark">{`Articles ${status}`}</Text>
          <Text color={`brand.${statusColors[status]}`} fontWeight="bold">
            {statusCounts[status]}
          </Text>
        </Box>
      ))}
    </VStack>
  );
}

export default Data;
