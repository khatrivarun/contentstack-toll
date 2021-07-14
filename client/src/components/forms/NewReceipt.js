import { Flex, Heading, Box, Button, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormField from '../common/FormField';

const NewReceipt = () => {

  const toast = useToast();

  const onFormSubmit = async (values) => {
    try {
      const response = await fetch('/v1/api/receipt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vehicleRegistrationNumber: values.vehicleRegistrationNumber,
          amountPayed: Number(values.amountPayed),
        })
      });

      if (!response.ok) {
        const error = await response.json();
        const errorMessages = error.message;

        errorMessages.forEach(error => {
          console.log(error);
          if (error.includes('amountPayed')) {
            toast({
              title: 'Error Occured',
              description: 'The amount payed must be either 100 or 200 ruppees',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          } else if (error.includes('vehicleRegistrationNumber')) {
            toast({
              title: 'Error Occured',
              description: 'Vehicle Registration Number is Required',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          } else {
            toast({
              title: 'Error Occured',
              description: error,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
        })
      } else {
        toast({
          title: 'Success',
          description: 'Receipt Generated',
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
      amountPayed: '',
    },
    validationSchema: yup.object().shape({
      vehicleRegistrationNumber: yup.string().required('Please enter a valid vehicle registration number'),
      amountPayed: yup.number().required('Please enter a valid amount'),
    }),
    onSubmit: onFormSubmit,
  });

  return (
    <Flex w="100%" direction="column">
      <Heading size="lg">Generate a new receipt!</Heading>
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

          <FormField
            label="Amount Payed"
            type="text"
            placeholder="Enter Amount Payed"
            value={formik.values.amountPayed}
            handleChange={formik.handleChange('amountPayed')}
            error={formik.errors.amountPayed}
          />
          <Button m={5} type="submit">Submit</Button>
        </form>
      </Box>
    </Flex>
  );
};

export default NewReceipt;
