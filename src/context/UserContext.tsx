import React, { createContext, useState, ReactNode } from "react";

// Define a interface para os dados do usuário
interface User {
  nome: string;
  email: string;
  dataNascimento: string;
  tituloEleitor: string;
  bairro: string;
}

// Define a interface para o contexto do usuário
interface UserContextType {
  users: User[];
  addUser: (user: User) => void;
}

// Cria o contexto com um valor padrão
export const UserContext = createContext<UserContextType | undefined>(undefined);

// Define o provedor do contexto do usuário
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  return (
    <UserContext.Provider value={{ users, addUser }}>
      {children}
    </UserContext.Provider>
  );
};
