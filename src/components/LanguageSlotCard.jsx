import React from 'react';
import CountryFlag from "react-country-flag";

function LanguageSlotCard({ slot }) {
  // Mapping languages to their respective country codes
  const getCountryCode = (language) => {
    const languageToCountryCodeMap = {
      English: "GB", // United Kingdom flag for English
      Spanish: "ES", // Spain flag for Spanish
      French: "FR",  // France flag for French
      German: "DE",  // Germany flag for German
      // ... add other languages and their codes as needed
    };
    return languageToCountryCodeMap[language] || 'UN'; // 'UN' as a fallback for unknown languages
  };

  return (
    <div className="p-2 bg-white border rounded flex items-center">
      <CountryFlag 
        countryCode={getCountryCode(slot.language)} 
        svg 
        style={{
          width: '2em', 
          height: '1em'
        }} 
        title={slot.language}
      />
      <span className="text-sm ml-2">{`${slot.language}: ${slot.startTime}`}</span>
    </div>
  );
}

export default LanguageSlotCard;
