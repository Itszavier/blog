// ModalContext.tsx
import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  currentModal: string | null;
  openModal: (modalKey: string) => void;
  closeModal: () => void;
}

const defaultModalContextValue: ModalContextType = {
  currentModal: null,
  openModal: () => {},
  closeModal: () => {},
};

const ModalContext = createContext<ModalContextType>(defaultModalContextValue);

export const ModalProvider: React.FC<{ children: any }> = ({ children }) => {
  const [currentModal, setCurrentModal] = useState<string | null>(null);

  const openModal = (modalKey: string) => {
    setCurrentModal(modalKey);
  };

  const closeModal = () => {
    setCurrentModal(null);
  };

  return (
    <ModalContext.Provider value={{ currentModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (modalKey: string) => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  const { currentModal, openModal, closeModal } = context;

  return {
    isOpen: currentModal === modalKey,
    openModal: () => openModal(modalKey),
    closeModal,
  };
};
