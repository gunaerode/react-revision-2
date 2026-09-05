import type { MyButtonProps } from "../types/common.types";

export function MyButton({
  children,
  handleButtonClick,
  buttonClassName = "default-button",
}: MyButtonProps) {
  return (
    <button className={buttonClassName} onClick={handleButtonClick}>
      {children}
    </button>
  );
}
