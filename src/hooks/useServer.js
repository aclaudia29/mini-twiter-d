import { toast } from "sonner";
import httpService from "../services/httpService.js";
import useAuth from "./useAuth.js";
import { useNavigate } from "react-router-dom";

function useServer() {
  const { token, setUser, logout } = useAuth();
  const navigate = useNavigate()

  const handleResponse = ({ data, loading, error, url }) => {
    if (data.message === 'Token incorrecto') {
      
      logout()

      navigate('/')
    }

    if (data?.status === "ok" && url === "/login") {
      setUser({ token: data.data });
    }

    if (data?.data?.email && (url === '/user' || url === '/user/avatar')) {
      setUser({ user: data.data });
    }

    if (error && error.status === "error") {
      toast.error("usuario o contraseña incorrecto");
      
    } else {
      if (error) {
        toast.error(error.message);
      }
    }

    return { data, loading, error };
  };

  return {
    get: ({ url }) => httpService({ method: "GET", url, token }).then(handleResponse),
    post: ({ url, body, hasImage }) => httpService({ method: "POST", url, token, body, hasImage }).then(handleResponse),
    put: ({ url, body, hasImage }) => httpService({ method: "PUT", url, token, body, hasImage }).then(handleResponse),
    delete: ({ url }) => httpService({ method: "DELETE", url, token }),
  };
}

export default useServer;
