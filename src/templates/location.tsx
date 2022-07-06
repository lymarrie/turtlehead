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
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
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
      "c_featuredFAQs.answer"
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["location"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = (props) => {
  return `${props.document.id.toString()}`;
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
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

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
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
    c_featuredFAQs
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
