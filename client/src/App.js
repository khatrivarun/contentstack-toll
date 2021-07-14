import { Heading, Box, Flex } from '@chakra-ui/react';
import NewReceipt from './components/forms/NewReceipt';
import ValidateReceipt from './components/forms/ValidateReceipt';

const App = () => {
  return (
    <Box m={10}>
      <Heading>Toll Booth!</Heading>
      <Flex marginY={10}>
        <NewReceipt />
        <ValidateReceipt />
      </Flex>
    </Box >
  );
};

export default App;
