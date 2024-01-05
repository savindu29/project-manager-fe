// RegisterFailedDialogProps.tsx
import React, { ReactNode } from "react";

interface RegisterFailedDialogProps {
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
        <div className="relative p-8 bg-red-200 max-w-md mx-auto">
          {children}
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-4 text-lg cursor-pointer"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}

export function RegisterFailedDialog({
  open,
  onClose,
  children,
}: RegisterFailedDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} className="w-full lg:w-96 max-h-48">
      <div className="text-lg font-bold text-white bg-red-400 p-4">
        Registration Failed
      </div>
      <div className="text-lg p-4">{children || "Please Enter Valid Inputs."}</div>
      <div className="p-4">
        <button
          onClick={onClose}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Try Again
        </button>
      </div>
    </Dialog>
  );
}
