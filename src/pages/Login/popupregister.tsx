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
        <Dialog open={open} handler={onClose} className="w-full lg:w-96 max-h-48 bg-black ">
          <DialogHeader className="text-lg font-bold text-white bg-blue-500 p-4">
          The account request was successful!
          </DialogHeader>
                        <DialogBody className="text-lg p-4">
                {children || (
                  <>
                    Please be patient,
                    <br />
                    the company will send you the login details soon.
                  </>
                )}
              </DialogBody>
        </Dialog>
      </>
    );
    
}
