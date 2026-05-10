import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LoadingOverlay } from '../Components/Loader/LoadingOverlay';
import { ErrorOverlay } from '../Components/Loader/ErrorOverlay';

interface GlobalUIContextType {
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  showError: (message: string, onRetry?: () => void) => void;
  hideError: () => void;
}

const GlobalUIContext = createContext<GlobalUIContextType | undefined>(undefined);

export const GlobalUIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string | undefined>();
  
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorRetry, setErrorRetry] = useState<(() => void) | undefined>(undefined);

  const showLoading = (message?: string) => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  const showError = (message: string, onRetry?: () => void) => {
    setErrorMessage(message);
    setErrorRetry(() => onRetry);
    setIsError(true);
  };

  const hideError = () => {
    setIsError(false);
  };

  return (
    <GlobalUIContext.Provider value={{ showLoading, hideLoading, showError, hideError }}>
      {children}
      {isLoading && <LoadingOverlay message={loadingMessage} />}
      {isError && (
        <ErrorOverlay 
          message={errorMessage} 
          onClose={hideError} 
          onRetry={errorRetry ? () => { hideError(); errorRetry(); } : undefined} 
        />
      )}
    </GlobalUIContext.Provider>
  );
};

export const useGlobalUI = () => {
  const context = useContext(GlobalUIContext);
  if (context === undefined) {
    throw new Error('useGlobalUI must be used within a GlobalUIProvider');
  }
  return context;
};
