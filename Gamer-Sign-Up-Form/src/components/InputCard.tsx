import { Card, Text, Separator, Field, Input, Checkbox, Button, Link } from "@chakra-ui/react";
import { type Options, passwordStrength } from "check-password-strength";
import { PasswordInput, PasswordStrengthMeter } from "./ui/password-input";
import { useMemo, useState } from "react";

const strengthOptions: Options<string> = [
    { id: 1, value: "weak", minDiversity: 0, minLength: 0 },
    { id: 2, value: "medium", minDiversity: 2, minLength: 6 },
    { id: 3, value: "strong", minDiversity: 3, minLength: 8 },
    { id: 4, value: "very-strong", minDiversity: 4, minLength: 10 },
  ];

const InputCard = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const strength = useMemo(() => {
    if (!password) return 0;
    const result = passwordStrength(password, strengthOptions);
    return result.id;
  }, [password]);

  const mismatch = confirm !== "" && confirm !== password;
  
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
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <PasswordStrengthMeter value={strength} width="100%" />
          <Field.HelperText>At least 8 characters</Field.HelperText>
        </Field.Root>
        <Field.Root invalid={mismatch}>
          <Field.Label>CONFIRM PASSWORD</Field.Label>
          <PasswordInput
            value={confirm}
            onChange={(e) => setConfirm(e.currentTarget.value)}
          />

          <Field.ErrorText>Passwords do not match</Field.ErrorText>
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
        <Button
          type="submit"
          variant="solid"
          size="lg"
          disabled={!password || !confirm || mismatch}
        >
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
