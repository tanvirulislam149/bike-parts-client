import React, { useState } from 'react';
import Banner from './Banner/Banner';
import Facilities from './Facilities';
import Footer from './Footer';
import Newsletter from './Newsletter';
import Parts from './Parts';
import Reviews from './Reviews';
import Summary from './Summary';

const HomePage = () => {
  const [homeLoading, setHomeLoading] = useState(true);
  return (
    <div>
      {
        homeLoading ? "" : <Banner></Banner>
      }
      <Parts setHomeLoading={setHomeLoading}></Parts>
      {
        homeLoading ? "" :
          <>
            <Summary></Summary>
            <Facilities></Facilities>
            <Newsletter></Newsletter>
            <Reviews></Reviews>
            <Footer></Footer>
          </>
      }
    </div>
  );
};

export default HomePage;