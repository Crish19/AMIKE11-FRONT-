// MobileBookingPage.js

import React from 'react';
import { useParams } from 'react-router-dom';
import BookingWidget from '../components/BookingWidget';

const MobileBookingPage = () => {
  const { tourId } = useParams();

  return (
<div className="">
      <BookingWidget selectedTourId={tourId}/>
    </div>
  );
};

export default MobileBookingPage;
