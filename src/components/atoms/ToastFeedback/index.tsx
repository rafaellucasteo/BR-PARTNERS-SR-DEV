// index.tsx
import { ClickAwayListener, useSnackbar } from "@mui/base";
import { forwardRef, useImperativeHandle, useState } from "react";
import { CustomSnackbar } from "./styles";

type ToastFeedbackProps = {
  message: string;
};

type ToastFeedbackHandle = {
  openToast: (type: "success" | "error") => void;
};

const ToastFeedback = forwardRef<ToastFeedbackHandle, ToastFeedbackProps>(
  ({ message }, ref) => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<"success" | "error">("success");

    useImperativeHandle(ref, () => ({
      openToast: (type: "success" | "error") => {
        setType(type);
        setOpen(true);
        setTimeout(() => {
          setOpen(false);
        }, 5000);
      },
    }));

    const handleClose = () => {
      setOpen(false);
    };

    const { getRootProps, onClickAway } = useSnackbar({
      onClose: handleClose,
      open,
      autoHideDuration: 5000,
    });

    return (
      <>
        {open && (
          <ClickAwayListener onClickAway={onClickAway}>
            <CustomSnackbar type={type} {...getRootProps()}>
              {message}
            </CustomSnackbar>
          </ClickAwayListener>
        )}
      </>
    );
  }
);

export default ToastFeedback;
export type { ToastFeedbackHandle };
