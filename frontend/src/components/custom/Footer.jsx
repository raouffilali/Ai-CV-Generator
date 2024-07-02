import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";
import React from "react";

const FooterFlow = () => {
  return (
    <Footer className="flex justify-between p-10  border-t-2 mt-96 ">
      <FooterCopyright href="#" by="Abderraouf Filali™" year={2024} />
      <FooterLinkGroup className="flex gap-3 ">
        <FooterLink href="#">About</FooterLink>
        <FooterLink href="#">Privacy Policy</FooterLink>
        <FooterLink href="#">Licensing</FooterLink>
        <FooterLink href="#">Contact</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
};

export default FooterFlow;
