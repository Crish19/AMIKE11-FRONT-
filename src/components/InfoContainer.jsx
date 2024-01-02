import React, { useEffect, useState } from 'react';

function ReadMoreText({ text }) {
  const maxLength = 600;
  const [isTruncated, setIsTruncated] = React.useState(text.length > maxLength);

  const toggleReadMore = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <p className="text-justify  md:text-justify">
      {isTruncated ? `${text.slice(0, maxLength)}...` : text}
      {text.length > maxLength && (
        <button onClick={toggleReadMore}  style={{ color: 'blue' }}>
          {isTruncated ? 'Read More' : 'Read Less'}
        </button>
      )}
    </p>
  );
}


function CollapsibleSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // ... Existing resize logic ...
  }, []);

  

  return (
    <div className="mb-4 border-b border-gray-300 pb-4">
      {/* Title and Toggle Button */}
      <div className="flex justify-between md:justify-start items-center mb-2">
        <h2 className="font-semibold text-lg text-orange-500">{title}</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden ml-2">
        <span className={`${isOpen ? 'text-red-500' : 'text-green-500'} text-xl mr-2`}>
            {isOpen ? '-' : '+'}
          </span>
        </button>
      </div>

      {/* Collapsible Content */}
      <div className={`${isOpen ? 'block' : 'hidden md:block'} px-2 md:px-0 text-gray-700 text-sm md:text-base`}>
        {children}
      </div>
    </div>
  );
}



function InfoContainer({ tour }) {
  return (
    <div>
      {/* Overview */}
      {tour.overview && (
        <CollapsibleSection title="Overview">
          <ReadMoreText text={tour.overview}/>
        </CollapsibleSection>
      )}

      {/* Meeting and Pickup */}
      {tour.meetingAddress && (
        <CollapsibleSection title="Meeting Point">
        <div className="mb-4">
          <p>{tour.meetingAddress}</p>
          {tour.googleMapsLink && (
            <a href={tour.googleMapsLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 cursor-pointer">
              Open in Google Maps
            </a>
          )}
          {tour.additionalMeetingInfo && <p className="italic text-orange-500">{tour.additionalMeetingInfo}</p>}
        </div>
        </CollapsibleSection>
      )}

     {/* What To Expect */}
  {tour.itinerary && tour.itinerary.length > 0 && (
     <CollapsibleSection title="What to Expect">
    <div className="itinerary-section, text-justify ">
      <h3 className="font-semibold mt-4">Itinerary</h3>
      <p className=" mb-8">This is a typical itinerary for this product</p>
      {tour.itinerary.map((point, index) => (
        <div key={index} className="itinerary-point items-start flex mb-3">
          <div className="mr-2 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-orange-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 
                    19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 
                    8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
             <div className=' title and description mt-1'>
              <h4 className="font-semibold mr-3">{point.title}</h4>
              <ReadMoreText text={point.description} maxLength={600} />

             </div>
          
       
        </div>
        
      ))}
    </div>
    </CollapsibleSection>
  )}
      

      {/* Additional Information */}
      <CollapsibleSection title="Additional Information">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Tour Donations</h3>
          <ul className="list-disc pl-6">
            <li>Our tours are "Pay What You Want" experiences.</li>
            <li>
              While tours are free, donations of around 10 euros per person are
              appreciated.
            </li>
            <li>Donations support guides and maintain tour quality.</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Payment Methods</h3>
          <ul className="list-disc pl-6">
            <li>We accept cash donations on-site.</li>
            <li>
              Electronic payments are available:
              <ul className="list-disc pl-6 mt-2">
                <li>Credit cards</li>
                <li>PayPal</li>
                <li>Revolut</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      
      <p className="mb-4 italic text-orange-500">
        Your support helps us share Stockholm's history and culture.
      </p>
      </CollapsibleSection>
    </div>
  );
}

export default InfoContainer;
