"use client"

import { forwardRef } from "react";
import { RxCross2 } from 'react-icons/rx';

const ConfirmationModal = forwardRef((props, ref) => {
  const {
    title = "Are you sure?",
    message = "Do you really want to proceed with this action?",
    confirmText = "Yes",
    cancelText = "No",
    onConfirm,
    onCancel,
    isLoading = false,
    modalId = "confirmationModal",
  } = props

  return (
    <dialog className="modal" id={modalId} ref={ref}>
      <div className="modal-box rounded-lg p-0 w-full sm:w-[420px] h-fit overflow-hidden bg-white shadow-lg">
        
        {/* Close Button */}
        <form method="dialog" className="absolute top-4 right-4 z-10">
          <button
            className="outline-none p-1 hover:bg-gray-100 rounded-md transition-colors"
            onClick={onCancel}
            aria-label="Close modal"
          >
            <RxCross2 className="w-5 h-5 text-gray-600" />
          </button>
        </form>

        {/* Content */}
        <div className="p-8">
          
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full border-2 border-red-500 relative">
                <div className="absolute inset-2 flex items-center justify-center">
                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-black text-center mb-2">
            {title}
          </h2>

          {/* Message */}
          <p className="text-gray-600 text-center text-sm leading-relaxed mb-8">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            
            {/* Cancel Button */}
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 px-4 py-3 text-black font-medium border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {cancelText}
            </button>

            {/* Confirm Button */}
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <form method="dialog" className="modal-backdrop" onClick={onCancel}>
        <button className="cursor-default"></button>
      </form>
    </dialog>
  )
})

ConfirmationModal.displayName = "ConfirmationModal"

export default ConfirmationModal
