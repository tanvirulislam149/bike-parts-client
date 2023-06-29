import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";



const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useNavigate();
    return <Component history={history} {...props} />
  }
  return Wrapper;
}

const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname]);

  return children || null;
};

export default ScrollToTop;