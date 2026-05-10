export const LoadingOverlay = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-white animate-pulse">{message}</p>
    </div>
  );
};
