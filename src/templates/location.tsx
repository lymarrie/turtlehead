/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import * as React from "react";
import Banner from "../components/banner";
import Header, { Link } from "../components/header";
import Footer from "../components/footer";
import Cta from "../components/cta";
import Address from "../components/address";
import Contact from "../components/contact";
import PhotoGallery from "../components/photo-gallery";
import List from "../components/list";
import Hours from "../components/hours";
import StaticMap from "../components/static-map";
import Faqs from "../components/faqs";

import { formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';

import "../index.css";
import {
  Default,
  GetPath,
  TemplateConfig,
  TemplateProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/yext-sites-scripts";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "locations",
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "description",
      "neighborhood",
      "hours",
      "photoGallery",
      "slug",
      "geocodedCoordinate",
      "services",
      "c_featuredFAQs.question",
      "c_featuredFAQs.answer",
      "paymentOptions"
    ],
    filter: {
      entityTypes: ["location"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};


export const getPath: GetPath<TemplateProps> = (props) => {
  return `${props.document.id.toString()}`;
};


export const getHeadConfig: GetHeadConfig<TemplateProps> = (props): HeadConfig => {
  return {
    title: props.document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          description: props.document.description,
        },
      },
    ],
  };
};


const Location: Default<TemplateProps> = (props) => {
  const { document } = props;
  const {
    _site,
    name,
    address,
    description,
    neighborhood,
    openTime,
    hours,
    mainPhone,
    photoGallery,
    geocodedCoordinate,
    services,
    c_featuredFAQs,
    paymentOptions
  } = document;

  var formattedPhone = formatPhoneNumber(mainPhone);
  console.log(document);



  return (
    <>
      <div className="centered-container">
        <Header
          links={_site.c_header}
          logo={_site.logo}
        ></Header>
      </div>
      <Banner name={name} address={address} openTime={openTime}>
        <div className="bg-white h-40 w-1/5 flex items-center justify-center text-center flex-col space-y-4 rounded-lg">
          <div className="text-black text-base">Visit Us Today!</div>
          <Cta
            buttonText="Get Directions"
            url="http://google.com"
            style="primary-cta"
          />
        </div>
      </Banner>
      <div className="centered-container">
        <div className="section">
            <div className="grid md:grid-cols-2 lg:grid-cols-3">
              <div className="address-phone space-y-5">
                <h2 className="text-xl font-semibold mb-4">Address</h2>
                <Address address={address}></Address>
                <div className="space-x-3">
                  <span>&#128222;</span>
                  <span>{formattedPhone}</span>
                </div>
              </div>
              <Hours title="Hours" hours={hours}></Hours>
              <div className="description">
                <div className="text-xl font-semibold mb-4">About {name} - {neighborhood}</div>
                <p>{description}</p>
              </div>
            </div>
        </div>
        <div className="section">
          <h2>Payment Options</h2>
          {paymentOptions}
        </div>
        <div className="section">
          <PhotoGallery 
            photoGallery={photoGallery}
            height="300"
            width="450"
            ></PhotoGallery>
        </div>
        <div className="section">
          <Faqs faqs={c_featuredFAQs}></Faqs>
        </div>
        <Footer links={_site.c_footer} instagram={_site.instagramHandle} facebook={_site.facebookVanityUrl} twitter={_site.twitterHandle}></Footer>
      </div>
    </>
  );
};

export default Location;
