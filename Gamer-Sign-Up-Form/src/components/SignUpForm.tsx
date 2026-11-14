import { Box, Image, Separator, Text, Stack } from "@chakra-ui/react"
import Title from "./Title"
import InputCard from "./InputCard";
import { useState } from "react";
import SuccessCard from "./SuccessCard";

const SignUpForm = () => {
  const [callsign, setCallsign] = useState<string | null>(null);
  
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
        <Text>{callsign || "UNASSIGNED"}</Text>
      </Stack>

      {callsign ? (
        <SuccessCard callsign={callsign} />
      ) : (
        <InputCard onSuccess={setCallsign} />
      )}
    </Box>
  );
}

export default SignUpForm