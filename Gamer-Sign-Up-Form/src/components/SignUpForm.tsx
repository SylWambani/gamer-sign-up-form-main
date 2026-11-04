import { Box, Image, Separator, Text, Stack } from "@chakra-ui/react"
import Title from "./Title"
import InputCard from "./InputCard";

const SignUpForm = () => {
  return (
    <Box>
      <Box>
        <Image src="./src/assets/images/logo.svg" alt="Logo" />
      </Box>
      <Box>
        <Title />
        <Separator size="sm" />
      </Box>
      <Stack direction="row" justify="space-between">
        <Text>OPERATOR ID</Text>
        <Text>UNASSIGNED</Text>
      </Stack>
      <InputCard/>
    </Box>
  );
}

export default SignUpForm