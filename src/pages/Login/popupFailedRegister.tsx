// RegisterFailedDialogProps.tsx
import React, { ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

interface RegisterFailedDialogProps {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
}
export function RegisterFailedDialog({
  open,
  onClose,
  children,
}: RegisterFailedDialogProps) {
  return (
      <>
        
        <Dialog open={open} handler={onClose} className="w-full lg:w-96 max-h-48 bg-red-200">
          <DialogHeader className="text-lg font-bold text-white bg-red-400 p-4">
            Registration Faield
          </DialogHeader>
          <DialogBody className="text-lg p-4">
            {children || "Please Enter Valid Inputs."}
          </DialogBody>
          <DialogFooter className="p-4">
            <Button
              variant="text"
            color="white"
            onClick={() => {
                onClose(); // Close the dialog
              }}
            className="mr-1"
          >
            <span>Try Again</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
    
}
