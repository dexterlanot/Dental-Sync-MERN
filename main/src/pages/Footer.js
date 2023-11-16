import React from "react";
import { FacebookIcon } from "../assets/SvgIcons";

function Footer() {
  const Facebook = () => {
    const externalLink = "https://www.facebook.com/Dr.JimboPlata";

    window.open(externalLink, "_blank");
  };
  return (
    <footer>
      <div class="footer-content">
        <p>&copy; 2023 Tooth Talks Dental Clinic. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
