import React, { useRef, useEffect } from 'react';
import landingImage from '../assets/about.jpg';

function About() {
  return (
    <section className='about' id='about'>
      <h1> About Us </h1>
      <div className='about-container'>
        <div className='about-content'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lacus laoreet non curabitur gravida arcu ac tortor dignissim. Eget lorem dolor sed viverra. Risus nec feugiat in fermentum posuere urna nec. Est ullamcorper eget nulla facilisi etiam dignissim diam. Morbi leo urna molestie at elementum eu facilisis sed. Turpis egestas sed tempus urna et pharetra pharetra massa. Amet volutpat consequat mauris nunc congue nisi vitae. Mattis molestie a iaculis at erat pellentesque adipiscing commodo elit.
          </p>
          <h3 className='about-subtitle'>
            Meet the Dentist
          </h3>
          <h4>
            Dr. Jimbo Beloso Plata
          </h4>
          <p className='dentist-details'>General Dentist <br /> Oral Surgery <br /> Orthodontist </p>
        </div>
        <div className='about-img'>
          <img src={landingImage} alt='About Us' />
        </div>
      </div>
    </section>
  );
}

export default About;
