import { Box, Text, VStack } from '@chakra-ui/react';

const list = [
  {
    id: 1,
    name: 'Article published',
    value: 5,
    status: 'published',
  },
  {
    id: 2,
    name: 'Article Rejected',
    value: 6,
    status: 'Rejected',
  },
  {
    id: 3,
    name: 'Article In process',
    value: 1,
    status: 'Inprocess',
  },
  {
    id: 4,
    name: 'Article verified',
    value: 6,
    status: 'verified',
  },
];

const statusColors = {
  published: 'green',
  Rejected: 'red',
  Inprocess: 'blue',
  verified: 'yellow',
};

function Data() {
  return (
    <VStack as="ul" spacing={0} listStyleType="none" width="100%">
      {list.map((item) => (
        <Box
          key={item.id}
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
          <Text color="brand.dark">{item.name}</Text>
          <Text color={`brand.${statusColors[item.status]}`} fontWeight="bold">
            {item.value}
          </Text>
        </Box>
      ))}
    </VStack>
  );
}

export default Data;
