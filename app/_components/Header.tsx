import Logo from "../_components/Logo";
import Navigation from "../_components/Navigation";

function Header() {
  return (
    <header className="px-8 py-5 bg-slate-600 shadow-md fixed z-[1000] w-full">
      <div className="hidden md:flex  justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
