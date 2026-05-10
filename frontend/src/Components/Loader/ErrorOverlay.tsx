interface ErrorOverlayProps {
  message?: string;
  onRetry?: () => void;
  onClose?: () => void;
}

export const ErrorOverlay = ({ 
  message = "Something went wrong.", 
  onRetry,
  onClose 
}: ErrorOverlayProps) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#111827] border border-red-500/30 rounded-2xl p-6 max-w-sm w-full shadow-2xl flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Error Detected</h3>
        <p className="text-gray-400 mb-6">{message}</p>
        <div className="flex gap-3 w-full">
          {onClose && (
            <button 
              onClick={onClose}
              className="flex-1 py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors font-medium"
            >
              Close
            </button>
          )}
          {onRetry && (
            <button 
              onClick={onRetry}
              className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
