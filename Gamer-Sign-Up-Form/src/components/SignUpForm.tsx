import { Box, Image, Separator, Text, Stack } from "@chakra-ui/react"
import Title from "./Title"
import InputCard from "./InputCard";

const SignUpForm = () => {
  return (
    <Box width="100%">
      <Box pb="8">
        <Image src="./src/assets/images/logo.svg" alt="Logo" />
      </Box>
      <Box>
        <Title />
        <Separator size="sm" pb="3" />
      </Box>
      <Stack direction="row" justify="space-between" pb="5">
        <Text>OPERATOR ID</Text>
        <Text>UNASSIGNED</Text>
      </Stack>
      <InputCard/>
    </Box>
  );
}

export default SignUpForm