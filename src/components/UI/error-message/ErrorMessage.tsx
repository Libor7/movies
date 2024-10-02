/** COMPONENTS */
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

/** LIBRARIES */
import { FC } from "react";

/** MODELS */
import { CONTENT } from "../../../model/constants";

interface ErrorMessageProps {
  message: string;
  onErrorClose?: () => void;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message, onErrorClose }) => {
  return (
    <Alert
      variant="filled"
      severity="error"
      onClose={onErrorClose}
      sx={{ margin: "0 auto", position: "absolute", top: "20%" }}
    >
      <AlertTitle>{CONTENT.ERROR_TITLE}</AlertTitle>
      {message}
    </Alert>
  );
};

export default ErrorMessage;
