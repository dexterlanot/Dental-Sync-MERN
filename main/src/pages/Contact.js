import React, { Component } from "react";
import * as SvgIcons from '../assets/SvgIcons'

function Contact() {
  return (
    <section className="contact" id="contact">
      <h1> Contact Us </h1>
      <div className="contact-container">
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.7494824036626!2d121.00574750976905!3d13.793969896261686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd0fd90cab807b%3A0x4743dd990cccad37!2sTooth%20Talks%20Dental%20Clinic!5e0!3m2!1sen!2sph!4v1700015589951!5m2!1sen!2sph"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="contact-details">
          <ul className="contact-info">
            <li>
              <SvgIcons.LocationIcon/>
              <span>Q2V5+H8P, Makalintal Ave, Poblacion, Bauan, Batangas</span>
            </li>
            <li>
              <SvgIcons.EmailIcon/>
              <span> toothtalksdental@gmail.com </span>
            </li>
            <li>
              <SvgIcons.PhoneIcon/>
              <span> 0998 953 5223 </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Contact;
