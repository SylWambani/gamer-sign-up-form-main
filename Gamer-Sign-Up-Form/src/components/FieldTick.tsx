import { Box, Image } from "@chakra-ui/react";
import type { ReactNode } from "react";
import tickIcon from "../assets/images/icon-tick-20.svg";

type FieldTickProps = {
  show: boolean;
  right?: string;
  children: ReactNode;
};

const FieldTick = ({ show, right = "3", children }: FieldTickProps) => {
  return (
    <Box position="relative" width="100%">
      {children}
      {show && (
        <Image
          src={tickIcon}
          alt=""
          position="absolute"
          right={right}
          top="50%"
          transform="translateY(-50%)"
          boxSize="5"
          pointerEvents="none"
        />
      )}
    </Box>
  );
};

export default FieldTick;
