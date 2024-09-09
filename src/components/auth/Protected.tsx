import { useCallback, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

interface responseDataType {
  isAuthenticated: boolean;
}

function Protected({ authentication, children }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateToken = useCallback(async () => {
    try {
      const response = await axios.get<responseDataType>(
        "/api/users/validate",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return { isAuthenticated: false, error };
    }
  }, []);

  useEffect(() => {
    const checkValidation = async () => {
      const data = await validateToken();
      if (
        authentication &&
        Boolean(data.isAuthenticated) !== Boolean(authentication)
      ) {
        // remove set user authstatus
        // dispatch();
        navigate("/login");
      } else if (
        !authentication &&
        data?.isAuthenticated !== undefined &&
        Boolean(data.isAuthenticated) !== Boolean(authentication)
      ) {
        navigate("/");
      }
    };

    checkValidation();
  }, [authentication, navigate, validateToken, dispatch]);

  return <>{children}</>;
}

export default Protected;
