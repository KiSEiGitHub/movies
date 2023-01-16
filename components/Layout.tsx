import Head from "next/head";
import React from "react";

function Layout({ title, children }: any) {
  return (
    <>
      <Head>
        <title>Movies - {title}</title>
      </Head>
      {children}
    </>
  );
}

export default Layout;
