import { createContext, useContext, useState, type ReactNode } from 'react';
import { LoadingOverlay } from '../Components/Loader/LoadingOverlay';
import { ErrorOverlay } from '../Components/Loader/ErrorOverlay';
import { SuccessOverlay } from '../Components/Loader/SuccessOverlay';

interface GlobalUIContextType {
  showLoading: (message?: string) => void;
  hideLoading: () => void;
  showError: (message: string, onRetry?: () => void) => void;
  hideError: () => void;
  showSuccess: (message: string) => void;
  hideSuccess: () => void;
}

const GlobalUIContext = createContext<GlobalUIContextType | undefined>(undefined);

export const GlobalUIProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string | undefined>();
  
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorRetry, setErrorRetry] = useState<(() => void) | undefined>(undefined);

  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setIsSuccess(true);
  };

  const hideSuccess = () => {
    setIsSuccess(false);
  };

  return (
    <GlobalUIContext.Provider value={{ showLoading, hideLoading, showError, hideError, showSuccess, hideSuccess }}>
      {children}
      {isLoading && <LoadingOverlay message={loadingMessage} />}
      {isError && (
        <ErrorOverlay 
          message={errorMessage} 
          onClose={hideError} 
          onRetry={errorRetry ? () => { hideError(); errorRetry(); } : undefined} 
        />
      )}
      {isSuccess && (
        <SuccessOverlay 
          message={successMessage} 
          onClose={hideSuccess} 
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
