import React, { ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

interface DialogDefaultProps {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export function DialogDefault({ open, onClose, children }: DialogDefaultProps) {
  return (
    <>
      <Dialog open={open} handler={onClose} className="w-full lg:w-186 max-h-48">
        <DialogHeader className="text-lg font-bold">LogIn Failed</DialogHeader>
        <DialogBody className="text-lg">{children}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={onClose}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
