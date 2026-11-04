import { Card, Text, Separator, Field, Input, Checkbox, Button, Link } from "@chakra-ui/react";
import { PasswordInput } from "./ui/password-input";

const InputCard = () => {
  return (
    <Card.Root>
      <Card.Header>
        <Text>NEW OPERATOR</Text>
        <Text>ALL REQUIRED</Text>
      </Card.Header>
      <Separator />
      <Card.Body>
        <Field.Root>
          <Field.Label>CALLSIGN</Field.Label>
          <Input placeholder="e.g. Vortex_07" />
          <Field.HelperText>
            3–20 characters: letters, numbers, _ or -
          </Field.HelperText>
        </Field.Root>
        <Field.Root>
          <Field.Label>EMAIL</Field.Label>
          <Input placeholder="you@example.com" />
        </Field.Root>
        <Field.Root>
          <Field.Label>PASSWORD</Field.Label>
          <PasswordInput />
          <Field.HelperText>At least 8 characters</Field.HelperText>
        </Field.Root>
        <Field.Root>
          <Field.Label>CONFIRM PASSWORD</Field.Label>
          <PasswordInput />
        </Field.Root>
      </Card.Body>
      <Card.Footer>
        <Checkbox.Root>
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>
            I accept the{" "}
            <Link variant="underline" href="#">
              Terms
            </Link>{" "}
            and{" "}
            <Link variant="underline" href="#">
              Privacy Policy
            </Link>
          </Checkbox.Label>
        </Checkbox.Root>
        <Button type="submit" variant="solid" size="lg">
          INITIALIZE ACCOUNT
        </Button>
        <Text>
          Already an operator?{" "}
          <Link variant="underline" href="#">
            Log in
          </Link>
        </Text>
      </Card.Footer>
    </Card.Root>
  );
};

export default InputCard;
