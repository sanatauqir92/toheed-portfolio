const ImageModal = ({
  isOpen = true,
  onClose = () => {},
  imageUrl = 'https://picsum.photos/600/400?random=1',
  altText = 'Modal image',
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: { target: any; currentTarget: any }) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 opacity-98 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white shadow-xl max-w-xl max-h-1/2 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
          aria-label="Close modal"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <img
          src={imageUrl}
          alt={altText}
          className="max-w-full max-h-96 object-contain"
        />
      </div>
    </div>
  );
};

export default ImageModal;
