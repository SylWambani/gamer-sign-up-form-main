import { Card, Text, Button, Image} from "@chakra-ui/react";

type SuccessCardProps = {
  callsign: string;
};

const SuccessCard = ({ callsign }: SuccessCardProps) => {
  return (
    <Card.Root>
      <Card.Header>
        <Image
          src="./src/assets/images/icon-hex-check.svg"
          alt="Check Icon"
          h="5%"
          w="5%"
          fit="contain"
        />
        <Text>// HANDSHAKE COMPLETE</Text>
      </Card.Header>
      <Card.Body>
        <Text>Operator {callsign} provisioned. Your account is ready.</Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="solid" size="lg">
          CONTINUE TO LOG IN
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default SuccessCard;
