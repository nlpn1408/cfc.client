"use client";

import { Provider } from "react-redux";
// import { store } from "@/redux/store";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/site-header";
// import { getServerSession } from "next-auth";

import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  // const session = await getServerSession(authOptions)
  return (
    <div>
      {/* <Provider store={store}> */}
      <SiteHeader />
      {children}
      <Footer />
      {/* </Provider> */}
    </div>
  );
}
