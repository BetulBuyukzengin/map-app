import Logo from "./Logo";
import Navigation from "./Navigation";
import { CustomDrawer } from "./CustomDrawer";

function HamburgerDrawerMenuContent() {
    return (
        <CustomDrawer isHeader>
            <div className="lg:hidden flex flex-col justify-evenly items-center max-w-7xl mx-auto h-full ">
                <Logo />
                <Navigation />
            </div>
        </CustomDrawer>
    );
}

export default HamburgerDrawerMenuContent;
