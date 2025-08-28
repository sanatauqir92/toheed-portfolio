import Image from 'next/image';

const ImageModal = ({ isOpen = true, onClose = () => {} }) => {
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
      <div className="relative bg-white shadow-xl max-w-xl max-h-fit overflow-hidden">
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

        <div className="w-full">
          <iframe
            src="https://www.youtube.com/embed/7ZMfsTgxm0M?si=bid8k3CtFuEH8yGu"
            className="w-full aspect-video block mb-2"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
          <div className="flex flex-row mb-2">
            <Image
              src="/stills/lovespellcake_1.jpg"
              width={0}
              height={0}
              sizes="100vw"
              alt="Mock 1"
              className="w-1/3 h-24"
            />
            <Image
              src="/stills/lovespellcake_2.jpg"
              alt="Mock 2"
              width={0}
              height={0}
              sizes="100vw"
              className="w-1/3 h-24 pl-1"
            />
            <Image
              src="/stills/lovespellcake_3.jpg"
              alt="Mock 3"
              width={0}
              height={0}
              sizes="100vw"
              className="w-1/3 h-24 pl-1"
            />
          </div>
          <p className="text-xl">
            Blah Blah Blah <i>2025</i>
          </p>
          <p className="text-lg">📽️ Directed by Toheed Chaudhry</p>
          <p className="text-lg">✂️ Sana Tauqir</p>
          <p className="text-lg">All of Them</p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
