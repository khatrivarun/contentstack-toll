import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';

const FormField = ({
  error,
  label,
  type,
  placeholder,
  value,
  handleChange,
}) => {
  return (
    <Box m={5}>
      <FormControl isRequired isInvalid={error}>
        <FormLabel>{label}</FormLabel>
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          variant='filled'
        />
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </Box>
  );
};

export default FormField;
