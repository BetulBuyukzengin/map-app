import Logo from "../_components/Logo";
import Navigation from "../_components/Navigation";
import HamburgerDrawerMenuContent from "./HamburgerDrawerMenuContent";

function Header() {
  return (
    <header className="px-8 py-5 bg-slate-600 shadow-md fixed z-[1000] w-full">
      <div className="hidden lg:flex  justify-between items-center max-w-7xl xl:max-w-full mx-auto">
        <Logo />
        <Navigation />
      </div>
      <HamburgerDrawerMenuContent />
    </header>
  );
}

export default Header;
