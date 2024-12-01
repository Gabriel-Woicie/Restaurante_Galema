import React, { createContext, useContext, useState } from 'react';

type PedidoItem = {
  idproduto: number;
  nomeproduto: string;
  valorproduto: number;
  quantidade: number;
};

type PedidoContextType = {
  pedido: PedidoItem[];
  setPedido: React.Dispatch<React.SetStateAction<PedidoItem[]>>;
  totalItems: number;
  totalPrice: number;
};

const PedidoContext = createContext<PedidoContextType | undefined>(undefined);

export const PedidoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pedido, setPedido] = useState<PedidoItem[]>([]);

  const totalItems = pedido.reduce((acc, item) => acc + item.quantidade, 0);
  const totalPrice = pedido.reduce((acc, item) => acc + item.valorproduto * item.quantidade, 0);

  return (
    <PedidoContext.Provider value={{ pedido, setPedido, totalItems, totalPrice }}>
      {children}
    </PedidoContext.Provider>
  );
};

export const usePedido = () => {
  const context = useContext(PedidoContext);
  if (!context) {
    throw new Error('usePedido must be used within a PedidoProvider');
  }
  return context;
};
