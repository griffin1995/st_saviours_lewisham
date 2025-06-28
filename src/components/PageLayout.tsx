import React from "react";
import Head from "next/head";
import Navigation from "./Navigation";
import Footer from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  keywords?: string;
  className?: string;
}

export default function PageLayout({
  children,
  title,
  description = "St Saviour's Catholic Church in Lewisham - A welcoming community of faith serving South East London.",
  keywords = "Catholic Church, Lewisham, Mass Times, Sacraments, Community, Faith, South East London",
  className = ""
}: PageLayoutProps) {
  const fullTitle = title === "Home" ? "St Saviour's Catholic Church, Lewisham" : `${title} | St Saviour's Catholic Church`;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="St Saviour's Catholic Church" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href={`https://saintsaviourslewisham.co.uk${title === "Home" ? "/" : `/${title.toLowerCase().replace(/\s+/g, "-")}`}`} />
      </Head>
      
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className={`${className}`}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}