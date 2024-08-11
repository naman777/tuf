
const Popup = ({ message, onClose }: { message: string; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative z-10">
        <p className="text-gray-900 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Close
        </button>
      </div>
      <div className="fixed inset-0 bg-black opacity-50 z-0"></div>
    </div>
  );
};

export default Popup;
