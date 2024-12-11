'use client';

import { AlertCircle, X } from 'lucide-react';

interface DeleteEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteEventDialog({ isOpen, onClose, onConfirm }: DeleteEventDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Delete Event
          </h2>
          <p className="text-gray-600 mb-6">
            You are going to delete this event. This action cannot be undone.
          </p>

          <div className="flex gap-4 w-full">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
