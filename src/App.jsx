import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Currency from '../hook/hook';
import { v4 as uuidv4 } from 'uuid';
import county from './county';

function App() {
  const country = county();
  const [curr, setCurr] = useState('USD');
  const [otherCurr, setOtherCurr] = useState('INR');
  const [toInput, setToInput] = useState('');
  const [fromInput, setFromInput] = useState('');
  const [inside, setInside] = useState('');
  const [bgIndex, setBgIndex] = useState(0);

  const gradients = [
    'from-teal-400 via-blue-500 to-purple-600',
    'from-pink-300 via-purple-300 to-indigo-500',
    'from-yellow-300 via-red-300 to-pink-500',
    'from-green-300 via-blue-500 to-purple-400'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % gradients.length);
    }, 2000); // Change background every 2 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const handleFrom = (e) => {
    setInside('');
    setCurr(e.target.value);
  };
  const handleTO = (e) => {
    setOtherCurr(e.target.value);
    setInside('');
  };
  const handleToInput = (e) => setToInput(e.target.value);
  const handleFromInput = (e) => {
    setFromInput(e.target.value);
    setInside('');
  };

  const currencyData = Currency(curr);
  const handleSubmit = () => {
    const answer = fromInput * currencyData[otherCurr.toLocaleLowerCase()];
    setInside(answer.toFixed(2)); // Format to 2 decimal places for display
  };

  if (!currencyData) {
    return <p>Loading...</p>;
  }

  const countryKeys = Object.keys(country);

  return (
    <div
      className={`min-h-screen flex flex-col transition-all duration-2000 ease-in-out bg-gradient-to-r ${gradients[bgIndex]}`}
    >
      <header className="bg-gray-900 bg-opacity-30 py-4 text-center shadow-md transition-all duration-2000 ease-in-out">
        <h1 className="text-3xl font-semibold text-white">Currency Converter</h1>
      </header>

      <main className="flex-grow flex items-center justify-center py-8">
        <motion.div
          className="bg-white bg-opacity-30 p-8 rounded-lg shadow-lg max-w-md w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-6">
            <label className="block text-gray-900 text-sm font-medium mb-2">From</label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg mb-2 bg-white bg-opacity-50 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              onChange={handleFromInput}
              placeholder="Enter amount"
            />
            <select
              className="w-full p-3 border border-gray-300 rounded-lg bg-white bg-opacity-50 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              onChange={handleFrom}
              value={curr}
            >
              {countryKeys.map((d) => (
                <option key={uuidv4()} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-900 text-sm font-medium mb-2">To</label>
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg mb-2 bg-white bg-opacity-50 text-gray-800 placeholder-gray-600"
              readOnly
              value={inside}
              placeholder="Converted amount"
            />
            <select
              className="w-full p-3 border border-gray-300 rounded-lg bg-white bg-opacity-50 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              onChange={handleTO}
              value={otherCurr}
            >
              {countryKeys.map((d) => (
                <option key={uuidv4()} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <button
            className="w-full bg-gray-700 text-white p-3 rounded-lg hover:bg-gray-600 transition"
            onClick={handleSubmit}
          >
            Convert
          </button>

          {inside && (
            <div className="mt-6 text-center text-lg font-semibold text-gray-800">
              Converted Amount: {inside} {otherCurr}
            </div>
          )}
        </motion.div>
      </main>

      <footer className="bg-gray-900 bg-opacity-50 py-4 text-center shadow-md transition-all duration-2000 ease-in-out">
        <p className="text-sm text-white">© 2024 Currency Converter Inc.</p>
      </footer>
    </div>
  );
}

export default App;
