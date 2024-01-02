import React, { useCallback, useEffect} from "react";

function BookingForm({
  showModal,
  setShowModal,
  handleBooking,
  isFormValid,
  name,
  handleNameChange,
  email,
  handleEmailChange,
  phone,
  handlePhoneChange,
  setName,
  setEmail,
  setPhone,
  isLoading,
}) {

  

  const resetForm = useCallback(() => {
    setName("");
    setEmail("");
    setPhone("");
  }, [setName, setEmail, setPhone]);
  

  useEffect(() => {
    // Add a click event listener to the background overlay
    const closeModalOnOverlayClick = (e) => {
      if (e.target.classList.contains("bg-black")) {
        setShowModal(false);
        resetForm();
      }
    };

    if (showModal) {
      document.addEventListener("click", closeModalOnOverlayClick);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", closeModalOnOverlayClick);
    };
  }, [showModal, setShowModal,resetForm]);

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-4 border border-gray-500 rounded-3xl z-10">
            <button
              onClick={() => {
              setShowModal(false)
              resetForm();
              }}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
            <h2 className="font-bold text-2xl mb-3">Customer Information</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600">
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="p-2 border border-gray-300 rounded-xl w-full"
                value={name}
                onChange={handleNameChange}
                placeholder="John Doe"

              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="p-2 border border-gray-300 rounded-xl w-full"
                value={email}
                onChange={handleEmailChange}
                placeholder="example@mail.com"

              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-600">
                WhatsApp/Telephone:
              </label>
              <input
                type="text"
                id="phone"
                className="p-2 border border-gray-300 rounded-xl w-full"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+1234567890"
              pattern="[+]{1}[0-9]{11,14}"

              />
            </div>
            <button
  onClick={handleBooking}
  disabled={!isFormValid() || isLoading}
  className={`bg-blue-500 text-white py-2 px-4 rounded-md w-full mt-4 ${
    !isFormValid() || isLoading ? "bg-gray-400 cursor-not-allowed" : ""
  }`}
>
  {isLoading ? 'Processing...' : 'Book Now'}
</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingForm;
