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
      console.log("response: " + response.data.isValid);
      dispatch(setCredentials(response.data));
    } catch (err) {
      //
      console.log(err);
    }
  };

  return { login, isLoading, error };
};
