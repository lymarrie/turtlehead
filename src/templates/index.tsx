/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */

 import * as React from "react";
 import { useState } from "react";
 import fetch from "fetch-everywhere";
 import { Pokemon } from "pokenode-ts";
 import {
  Default,
  GetPath,
  TemplateConfig,
  TemplateProps,
  GetHeadConfig,
  HeadConfig,
 } from "@yext/yext-sites-scripts";
import "../index.css";
import Header, { Link } from "../components/header";
import Footer from "../components/footer";
import Banner from "../components/banner";
 
 /**
  * Not required depending on your use case.
  */
 export const config: TemplateConfig = {
   // The name of the feature. If not set the name of this file will be used (without extension).
   // Use this when you need to override the feature name.
   name: "index",
 };
 
 /**
  * Defines the path that the generated file will live at for production.
  *
  * NOTE: This currently has no impact on the local dev path. Local dev urls currently
  * take on the form: featureName/entityId
  */
 export const getPath: GetPath<TemplateProps> = () => {
   return `index.html`;
 };
 
 export const getHeadConfig: GetHeadConfig<TemplateProps> = (props): HeadConfig => {
  return {
    title: "Home Page",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          description: "This site was generated by the Yext SSG",
        },
      },
    ],
  };
};


 /**
  * This is the main template. It can have any name as long as it's the default export.
  * The props passed in here are the direct result from `getStaticProps`.
  */
 const Index: Default<TemplateProps> = (props) => {
  const { document } = props;
  const {
    _site, 
  } = document;

   return (
    <>
      <div className="centered-container">
      <Header
          links={_site.c_header}
          logo={_site.logo}
        ></Header>
      </div>
      <Banner name="Index Page"></Banner>
      <div className="centered-container">
        <div className="section space-y-10 px-10">
          <h1 className="text-center">Welcome to {_site.name}!</h1>
          <div className="px-14 space-y-5">
            <p>
              {_site.name} was created by a group of technology experts based in New York City. They want to not only provide perfect answers everywhere... but perfect <i><strong>tacos</strong></i> everywhere! The authentic taste comes from family recipes and from fresh, simple and tasteful ingredients straight from home. In every taco from{_site.name} there is a bit of true Mexican culture and flavor.</p>
          </div>
          <Footer links={_site.c_footer} instagram={_site.instagramHandle} facebook={_site.facebookVanityUrl} twitter={_site.twitterHandle}></Footer>
        </div>
      </div>
    </>
   );
 };
 
 export default Index;
 