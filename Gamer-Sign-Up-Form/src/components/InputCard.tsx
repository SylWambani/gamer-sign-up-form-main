import {
  Card,
  Text,
  Separator,
  Field,
  Input,
  Checkbox,
  Button,
  Link,
} from "@chakra-ui/react";
import { type Options, passwordStrength } from "check-password-strength";
import { PasswordInput, PasswordStrengthMeter } from "./ui/password-input";
import { useMemo, useState } from "react";

type InputCardProps = {
  onSuccess: (callsign: string) => void;
};

const strengthOptions: Options<string> = [
  { id: 1, value: "weak", minDiversity: 0, minLength: 0 },
  { id: 2, value: "medium", minDiversity: 2, minLength: 6 },
  { id: 3, value: "strong", minDiversity: 3, minLength: 8 },
  { id: 4, value: "very-strong", minDiversity: 4, minLength: 10 },
];

const InputCard = ({ onSuccess }: InputCardProps) => {
  const [callsign, setCallsign] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accepted, setAccepted] = useState(false);

  const strength = useMemo(() => {
    if (!password) return 0;
    const result = passwordStrength(password, strengthOptions);
    return result.id;
  }, [password]);

  const mismatch = confirm !== "" && confirm !== password;
  const callsignValid = /^[A-Za-z0-9_-]{3,20}$/.test(callsign);
  const callsignInvalid = callsign !== "" && !callsignValid;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!callsignValid || !password || password !== confirm) return;
    onSuccess(callsign.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card.Root>
        <Card.Header>
          <Text>NEW OPERATOR</Text>
          <Text>ALL REQUIRED</Text>
        </Card.Header>
        <Separator />
        <Card.Body>
          <Field.Root invalid={callsignInvalid}>
            <Field.Label>CALLSIGN</Field.Label>
            <Input
              placeholder="e.g. Vortex_07"
              value={callsign}
              onChange={(e) => setCallsign(e.currentTarget.value)}
            />
            <Field.HelperText>
              3–20 characters: letters, numbers, _ or -
            </Field.HelperText>
          </Field.Root>
          <Field.Root>
            <Field.Label>EMAIL</Field.Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
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
          <Checkbox.Root
            checked={accepted}
            onCheckedChange={(e) => setAccepted(!!e.checked)}
          >
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
            disabled={
              !callsignValid || !password || !confirm || mismatch || !accepted
            }
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
    </form>
  );
};

export default InputCard;
