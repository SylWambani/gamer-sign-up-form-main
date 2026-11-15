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
import FieldTick from "./FieldTick";
import FieldError from "./FieldError";

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
  const [touched, setTouched] = useState({
    callsign: false,
    email: false,
    password: false,
    confirm: false,
  });
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const touch = (field: keyof typeof touched) =>
    setTouched((t) => ({ ...t, [field]: true }));

  const strength = useMemo(() => {
    if (!password) return 0;
    const result = passwordStrength(password, strengthOptions);
    return result.id;
  }, [password]);

  const mismatch = confirm !== "" && confirm !== password;
  const callsignValid = /^[A-Za-z0-9_-]{3,20}$/.test(callsign);
  const emailValid = /^\S+@\S+\.\S+$/.test(email);
  const passwordValid = password.length >= 8;
  const confirmValid = confirm !== "" && !mismatch;
  const callsignInvalid = touched.callsign && !callsignValid;
  const emailInvalid = touched.email && !emailValid;
  const passwordInvalid = touched.password && !passwordValid;
  const confirmInvalid = mismatch || (touched.confirm && confirm === "");
  const termsInvalid = submitAttempted && !accepted;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allValid =
      callsignValid && emailValid && passwordValid && confirmValid && accepted;

    if (!allValid) {
      setSubmitAttempted(true);
      setTouched({
        callsign: true,
        email: true,
        password: true,
        confirm: true,
      });
      return;
    }

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
            <FieldTick show={callsignValid}>
              <Input
                placeholder="e.g. Vortex_07"
                value={callsign}
                onChange={(e) => setCallsign(e.currentTarget.value)}
                onBlur={() => touch("callsign")}
              />
            </FieldTick>
            {!callsignInvalid && (
              <Field.HelperText>
                3–20 characters: letters, numbers, _ or -
              </Field.HelperText>
            )}
            <FieldError>Use 3–20 letters, numbers, _ or - only</FieldError>
          </Field.Root>
          <Field.Root invalid={emailInvalid}>
            <Field.Label>EMAIL</Field.Label>
            <FieldTick show={emailValid}>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                onBlur={() => touch("email")}
              />
            </FieldTick>
            <FieldError>Enter a valid email, like you@example.com</FieldError>
          </Field.Root>
          <Field.Root invalid={passwordInvalid}>
            <Field.Label>PASSWORD</Field.Label>
            <FieldTick show={passwordValid} right="10">
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                onBlur={() => touch("password")}
              />
            </FieldTick>
            <PasswordStrengthMeter value={strength} width="100%" />
            {!passwordInvalid && (
              <Field.HelperText>At least 8 characters</Field.HelperText>
            )}
            <FieldError>Password must be at least 8 characters</FieldError>
          </Field.Root>
          <Field.Root invalid={confirmInvalid}>
            <Field.Label>CONFIRM PASSWORD</Field.Label>
            <FieldTick show={confirmValid} right="10">
              <PasswordInput
                value={confirm}
                onChange={(e) => setConfirm(e.currentTarget.value)}
                onBlur={() => touch("confirm")}
              />
            </FieldTick>

            <FieldError>
              {confirm === ""
                ? "Re-enter your password"
                : "Passwords do not match"}
            </FieldError>
          </Field.Root>
        </Card.Body>
        <Card.Footer>
          <Field.Root invalid={termsInvalid}>
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

            <FieldError>
              Accept the Terms and Privacy Policy to continue
            </FieldError>
          </Field.Root>
          <Button
            type="submit"
            variant="solid"
            size="lg"
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
