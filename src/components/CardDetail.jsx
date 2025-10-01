import { useRef, useState, useEffect } from 'react';

const CardDetail = () => {
  const [card, setCard] = useState('');
  const inpRef = useRef(null);
  const cvvRef = useRef(null);

  // Format card number and auto-focus expiry input
  const handleInput = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(.{4})/g, '$1 ').trim();
    setCard(value);

    if (value.replace(/\s/g, '').length === 16) {
      inpRef.current?.focus();
    }
  };

  // Format expiry date and auto-focus CVV
  const handleExpiryInput = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      let month = parseInt(value.slice(0, 2), 10);
      if (month > 12) month = 12;
      value = month.toString().padStart(2, '0') + value.slice(2);
    }
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 6);
    }
    if (value.length > 7) {
      value = value.slice(0, 7);
    }
    if (inpRef.current) inpRef.current.value = value;

    if (value.length === 7) {
      cvvRef.current?.focus();
    }
  };

  // Limit CVV to 3 digits
  const handleCvvInput = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3) value = value.slice(0, 3);
    e.target.value = value;
  };

  // Add focus/blur listeners to expiry input
  useEffect(() => {
    const input = inpRef.current;
    if (!input) return;

    const handleFocus = () => {
      input.focus();
    };
    const handleBlur = () => {
      input.type = 'text';
      input.placeholder = 'MM/YYYY';
    };

    input.addEventListener('focus', handleFocus);
    input.addEventListener('blur', handleBlur);

    return () => {
      input.removeEventListener('focus', handleFocus);
      input.removeEventListener('blur', handleBlur);
    };
  }, []);

  return (
    <div>
      <form className="w-full max-w-md mx-auto p-4 bg-white shadow-md rounded" method="POST">
        <label className="block mb-4">
          <span className="font-bold text-gray-700">Card Number:</span>
          <input
            onChange={handleInput}
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            required
            value={card}
          />
        </label>

        <label className="block mb-4">
          <span className="font-bold text-gray-700">Expiry Date:</span>
          <input
            ref={inpRef}
            onChange={handleExpiryInput}
            className="block w-full p-2 border border-gray-300 rounded-md"
            type="text"
            name="expiryDate"
            placeholder="MM/YYYY"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="font-bold text-gray-700">CVV:</span>
          <input
            onChange={handleCvvInput}
            ref={cvvRef}
            className="block w-full p-2 border border-gray-300 rounded-md"
            type="text"
            name="cvv"
            placeholder="123"
            required
          />
        </label>
      </form>
    </div>
  );
};

export default CardDetail;