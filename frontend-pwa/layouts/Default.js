import SideNavBar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ children, currentUser }) => {
  return (
    <div>
      <SideNavBar currentUser={currentUser}>
        {children}
        <Footer />
      </SideNavBar>
    </div>
  );
}

export default Layout;