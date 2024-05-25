import css from "./ErrorMessage.module.css";

const ErrorMessage = ({
  message = "Oops! Something went wrong. Please try again later.",
}) => {
  return <p className={css.errorMsg}>{message}</p>;
};

export default ErrorMessage;
