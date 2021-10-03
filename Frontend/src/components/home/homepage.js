import React from 'react';
import NavBarBottom from '../shared/NavBarBottom'
import NavBarTop from '../../core/Menu'
import Footer from '../shared/Footer'
import PropTypes from 'prop-types';
import Section1 from './section1'
import Section2 from './section2'
import Section3 from './section3'
import Section4 from './section4'
import Section5 from './section5'



export default function HomeContainer(props) {
 
  return (
    <React.Fragment>
      <NavBarTop />
      {/* <Carousel /> */}
     {/* <FeaturedContainer /> */}
     <Section1 />
     <Section2 />
    <Section3 />
      {/* <Grid container spacing={3} justify="center" style={{backgroundColor:"#121119"}}>
        <Grid item xs={10} sm={9} md={9} lg={9} >
        <HomeTabs />

        </Grid>
      </Grid> */}
      {/* <Grid container spacing={3} justify="center" >
        <Grid item xs={10} sm={9} md={9} lg={9} >
        
        </Grid>
      </Grid> */}
     
     <Section4 />
      <Section5 />
      <Footer />
      <NavBarBottom />
      </React.Fragment>
  );
}

HomeContainer.propTypes = {
  post: PropTypes.object
};