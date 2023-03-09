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
  const [fullDid, setFullDid] = useState(null);
  const [width, setWidth] = useState(0);
  const [isOpenQRCamera, setIsOpenQRCamera] = useState(false);
  const [qrResult, setQrResult] = useState({});

  /**
   * update screent width
   * @param {*} event 
   */
  const updateWidth = (event) => {
    setWidth(window.innerWidth)
  }

  /**
   * clickOpenQrReader function
   */
  const clickOpenQrReader = () => {
    setIsOpenQRCamera(true);
  };

  return (
    <IDQContext.Provider 
      value={{
        currentAccount,
        setCurrentAccount,
        updateWidth,
        width,
        setWidth,
        fullDid, 
        setFullDid,
        isOpenQRCamera, 
        setIsOpenQRCamera,
        qrResult, 
        setQrResult,
        clickOpenQrReader
      }}
    >
      {children}
    </IDQContext.Provider>
  );
};