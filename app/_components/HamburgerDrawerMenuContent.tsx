"use client";
import { useRef } from "react";
import { CustomDrawer } from "./CustomDrawer";
import Logo from "./Logo";
import Navigation from "./Navigation";

function HamburgerDrawerMenuContent() {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <CustomDrawer
      isEdit={false}
      isHeader
      /* @ts-expect-error unnecessary error*/
      ref={ref}
    >
      <div className="lg:hidden flex flex-col justify-evenly items-center max-w-7xl mx-auto h-full ">
        <Logo />
        <Navigation />
      </div>
    </CustomDrawer>
  );
}

export default HamburgerDrawerMenuContent;
