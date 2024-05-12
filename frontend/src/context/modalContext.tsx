import React, { createContext, useContext, useState } from "react";

export interface IModalContextType {
  authModal: boolean;
  setAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const modalContext = createContext<IModalContextType>({
  authModal: false,
  setAuthModal: () => {},
});

export function useModal() {
  const context = useContext(modalContext);
  return context;
}

export function ModalProvider(props: any) {
  const [authModal, setAuthModal] = useState(true);

  return (
    <modalContext.Provider value={{ authModal, setAuthModal }}>
      {props.children}
    </modalContext.Provider>
  );
}
