import { withRouter } from "react-router-dom";
import Jwt_Decode from "jwt-decode";

const AuthVerifyComponent = ({ history }) => {
  history.listen(() => {
    // <--- Here you subscribe to the route change
    if (localStorage.getItem("a")) {
      const jwt_Token_decoded = Jwt_Decode(localStorage.getItem("JWT_Token"));
      console.log(jwt_Token_decoded.exp * 1000);
      console.log(Date.now());
      if (jwt_Token_decoded.exp * 1000 < Date.now()) {
        localStorage.clear();
      } else {
        initialstate.user = jwt_Token_decoded;
      }
    }
  });
  return <div></div>;
};

export default withRouter(AuthVerifyComponent);
