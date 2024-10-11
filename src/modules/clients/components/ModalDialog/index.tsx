import Box from "../../../../components/atoms/Box";
import Button from "../../../../components/atoms/Button";
import Modal from "../../../../components/atoms/Modal";
import Text from "../../../../components/atoms/Text";

interface ModalDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: ".5px solid #000",
  p: 4,
  borderRadius: 1,
};

export default function ModalDialog({
  open,
  onClose,
  title,
  subTitle,
  onConfirm,
  onCancel,
}: ModalDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Text id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Text>

        <Text id="modal-modal-description" sx={{ mt: 1 }}>
          {subTitle}
        </Text>

        <Box
          mt={5}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button
            onClick={() => {
              onConfirm();
            }}
            variant="outlined"
            color="error"
            label="Sim"
          ></Button>

          <Button
            onClick={() => {
              onCancel();
            }}
            label="Não"
          ></Button>
        </Box>
      </Box>
    </Modal>
  );
}
