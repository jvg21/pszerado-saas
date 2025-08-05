export const TypingIndicator = () => {
  return (
    <div className="flex gap-4">
      {/* AI Avatar */}
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
      </div>

      {/* Typing Animation */}
      <div className="flex-1 max-w-3xl">
        <div className="inline-block p-4 bg-gray-100 border border-gray-200 rounded-2xl">
          <div className="flex items-center gap-1">
            <span className="text-gray-500 text-sm mr-2">AI está digitando</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full typing-animation"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full typing-animation"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full typing-animation"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};