import * as React from "react";
import Cta from "../components/cta";

export type Link = {
  label: string;
  url: string;
};

type Header = {
  links: Link[];
  logo: any;
};

const Header = (props:Header) => {
  const { links, logo } = props;
  const headerLinks = links.map((link:any) => (
    <div>
      <a key="uRL" href={link.uRL} className="hover:underline">
        {link.label}
      </a>
    </div>
  ));

  return (
    <>
      <div className="centered-container">
        <nav className="py-3 flex items-center justify-between">
          <a href="/index">
            <img src={logo.image.url} width="130" height="130"></img>
          </a>
          <div className="flex gap-x-10 text-lg font-semibold">{headerLinks}</div>
          <div className="space-x-5">
            <Cta buttonText="Order Pickup" url="#" style="primary-cta"></Cta>
            <Cta
              buttonText="Order Delivery"
              url="#"
              style="secondary-cta"
            ></Cta>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
