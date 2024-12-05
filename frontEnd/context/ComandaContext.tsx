import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ComandaContextType {
  idComandaSelecionada: number | null;
  setIdComandaSelecionada: (id: number | null) => void;
}

const ComandaContext = createContext<ComandaContextType | undefined>(undefined);

export const ComandaProvider = ({ children }: { children: ReactNode }) => {
  const [idComandaSelecionada, setIdComandaSelecionada] = useState<number | null>(null);

  return (
    <ComandaContext.Provider value={{ idComandaSelecionada, setIdComandaSelecionada }}>
      {children}
    </ComandaContext.Provider>
  );
};

export const useComanda = () => {
  const context = useContext(ComandaContext);
  if (!context) {
    throw new Error('useComanda deve ser usado dentro de um ComandaProvider');
  }
  return context;
};
