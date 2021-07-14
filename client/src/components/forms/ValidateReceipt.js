import { Flex, Heading, Box, Button, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormField from '../common/FormField';

const ValidateReceipt = () => {

  const toast = useToast();


  const onFormSubmit = async (values) => {
    try {
      const response = await fetch('/v1/api/receipt/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vehicleRegistrationNumber: values.vehicleRegistrationNumber,
        })
      });

      const body = await response.json();

      if (body.status === "NOT_FOUND_OR_EXPIRED") {
        toast({
          title: 'Receipt Error',
          description: "Vehicle registration number either not found or has not payed for a return ticket",
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else if (body.status === "OK") {
        toast({
          title: 'Success',
          description: 'Receipt is valid for this vehicle registration number',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      vehicleRegistrationNumber: '',
    },
    validationSchema: yup.object().shape({
      vehicleRegistrationNumber: yup.string().required('Please enter a valid vehicle registration number'),
    }),
    onSubmit: onFormSubmit,
  });

  return (
    <Flex w="100%" direction="column">
      <Heading size="lg">Validate receipt!</Heading>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <FormField
            label="Vehicle Registration Number"
            type="text"
            placeholder="Enter Vehicle Registration Number"
            value={formik.values.vehicleRegistrationNumber}
            handleChange={formik.handleChange('vehicleRegistrationNumber')}
            error={formik.errors.vehicleRegistrationNumber}
          />

          <Button m={5} type="submit">Submit</Button>
        </form>
      </Box>
    </Flex>
  );
};

export default ValidateReceipt;
