// RegisterSuccessDialog.tsx
import React, { ReactNode } from "react";

interface RegisterSuccessDialogProps {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
}

interface DialogProps {
  open: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
}

function Dialog({ open, onClose, className, children }: DialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-50 overflow-auto ${className || ""}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative p-8 bg-black max-w-md mx-auto">
          {children}
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-4 text-lg cursor-pointer text-white"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}

export function RegisterSuccessDialog({
  open,
  onClose,
  children,
}: RegisterSuccessDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} className="w-full lg:w-96 max-h-48">
      <div className="text-lg font-bold text-white bg-blue-500 p-4">
        The account request was successful!
      </div>
      <div className="text-lg p-4">
        {children || (
          <>
            Please be patient,
            <br />
            the company will send you the login details soon.
          </>
        )}
      </div>
    </Dialog>
  );
}
