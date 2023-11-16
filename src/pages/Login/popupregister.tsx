// RegisterSuccessDialog.tsx
import React, { ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

interface RegisterSuccessDialogProps {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export function RegisterSuccessDialog({
  open,
  onClose,
  children,
}: RegisterSuccessDialogProps) {
  return (
    <>
      <Dialog open={open} handler={onClose} className="w-full lg:w-96 max-h-48">
        <DialogHeader className="text-lg font-bold">
          Registration Successful
        </DialogHeader>
        <DialogBody className="text-lg">{children}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="green"
            onClick={onClose}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
