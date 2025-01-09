import { useDispatch } from "react-redux";
import { ILogin } from "../interfaces";
import { useLoginMutation } from "../store/AuthApiSlice";
import { setCredentials } from "../store/AuthSlice";

export const useLoginHandler = () => {
  const [loginMutation, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const login = async (credentials: ILogin) => {
    try {
      const response = await loginMutation(credentials).unwrap();
      console.log("response: " + response.data.userName);
      dispatch(setCredentials(response.data));
      return response;
    } catch (err) {
      //
      console.log(err);
    }
  };

  return { login, isLoading, error };
};
