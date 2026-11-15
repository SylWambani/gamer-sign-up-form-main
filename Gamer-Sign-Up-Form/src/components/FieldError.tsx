import { Field, Image } from "@chakra-ui/react";
import type { ReactNode } from "react";
import warningIcon from "../assets/images/icon-alert.svg";

const FieldError = ({ children }: { children: ReactNode }) => {
  return (
    <Field.ErrorText>
      <Image src={warningIcon} alt="" boxSize="4" />
      {children}
    </Field.ErrorText>
  );
};

export default FieldError;
