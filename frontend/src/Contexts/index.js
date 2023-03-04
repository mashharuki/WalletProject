import { createContext, useContext, useState } from "react";

// create Context
export const IDQContext = createContext({});

/**
 * useContractContext function
 * @returns 
 */
export const useIDQContext = () => {
  return useContext(IDQContext);
}

/**
 * ContextProvider
 * @param 子コンポーネント
 */
export const ContextProvider = ({ children }) => {
      // ステート変数
      const [currentAccount, setCurrentAccount] = useState(null);

      return (
            <IDQContext.Provider 
                value={{
                  currentAccount,
                  setCurrentAccount
                }}
            >
                {children}
            </IDQContext.Provider>
      );
};