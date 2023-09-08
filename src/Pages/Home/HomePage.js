import React, { useState } from 'react';
import Banner from './Banner/Banner';
import Facilities from './Facilities';
import Footer from './Footer/Footer';
import Newsletter from './Newsletter/Newsletter';
import Parts from './Parts/Parts';
import Reviews from './Reviews/Reviews';
import Summary from './Summary';
import HotDeal from './HotDeal/HotDeal';

const HomePage = () => {
  return (
    <div>
      <>
        <Banner></Banner>
        <Facilities></Facilities>
        <Parts></Parts>
        <HotDeal />
        <Summary></Summary>
        <Reviews></Reviews>
        <Newsletter></Newsletter>
      </>
    </div>
  );
};

export default HomePage;