"use client";

import { PlusIcon, XIcon } from "lucide-react";
import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  footer,
  size = "md",
}) {
  const modalRef = useRef(false);

  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalRef}
            className={`bg-white-smoke w-full ${sizeClasses[size]} rounded-2xl p-6 relative shadow-xl`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="border-b border-silver-medal mb-4 pt-2 pb-4 flex justify-between items-center">
              {title && (
                <h2 className="text-xl font-bold text-stoplight">{title}</h2>
              )}
              <button
                onClick={onClose}
                className=" text-foreground/50 hover:text-stoplight cursor-pointer"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="text-gray-700 my-8">{children}</div>
            {footer && <div className="mt-6">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
