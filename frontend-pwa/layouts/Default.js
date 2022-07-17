import SideNavBar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <SideNavBar>
        { children }
        <Footer/>
      </SideNavBar>
    </div>
  );
}
 
export default Layout;