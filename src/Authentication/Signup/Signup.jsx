import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext/UserContext";
import UserForm from "../../components/SharedComponents/UserFormComponent/UserFormComponent";
import handleSignupService from "../../services/handleSignUpService";
import toast from "react-hot-toast";

function Signup() {
  const { setIsLoggedIn, setUserProfile } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    try {
      const data = await handleSignupService(formData);
      setIsLoggedIn(true);
      setUserProfile(data.userProfile);
      localStorage.setItem("userProfile", JSON.stringify(data.userProfile));
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    } catch (error) {
      if (error.response.status == 409) {
        toast.error("User already registered, please login to continue.");
      }
      console.error("Error during signup:", error);
    }
  };

  return (
    <UserForm
      title="Sign Up"
      buttonText="Sign Up"
      isAdminPanel={false}
      onSubmit={handleSignup}
      showRole={false}
    />
  );
}

export default Signup;
