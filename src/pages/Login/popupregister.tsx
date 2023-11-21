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
        <Dialog open={open} handler={onClose} className="w-full lg:w-96 max-h-48 bg-sky-400">
          <DialogHeader className="text-lg font-bold text-white bg-blue-500 p-4">
            Registration Successful
          </DialogHeader>
          <DialogBody className="text-lg p-4">
            {children || "Registration successful. Please login."}
          </DialogBody>
          <DialogFooter className="p-4">
            <Button
              variant="text"
            color="white"
            onClick={() => {
                onClose(); // Close the dialog
                window.location.href = '/login'; // Redirect to the login page
              }}
            className="mr-1"
          >
            <span>LogIn</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
    
}
