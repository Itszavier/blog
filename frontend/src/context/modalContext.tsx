// ModalContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface ModalContextType {
  modals: Record<string, boolean>;
  openModal: (modalKey: string) => void;
  closeModal: (modalKey: string) => void;
}

const defaultModalContextValue: ModalContextType = {
  modals: {},
  openModal: () => {},
  closeModal: () => {},
};

const ModalContext = createContext<ModalContextType>(defaultModalContextValue);

export const ModalProvider: React.FC<{ children: any }> = ({ children }) => {
  const [modals, setModals] = useState<Record<string, boolean>>({});

  useEffect(() => {
    console.log(modals);
  }, [modals]);

  const openModal = (modalKey: string) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalKey]: true,
    }));
  };

  const closeModal = (modalKey: string) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalKey]: false,
    }));
  };

  const contextValue = { modals, openModal, closeModal };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (modalKey: string) => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  const { modals, openModal, closeModal } = context;

  return {
    isOpen: modals[modalKey] || false, // Ensuring it always returns a boolean
    openModal: () => openModal(modalKey),
    closeModal: () => closeModal(modalKey),
  };
};
