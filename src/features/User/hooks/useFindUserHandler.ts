import { useState } from "react";
import { toast } from "react-toastify";
import { IQuery } from "../../../interfaces";
import { BuildQuery } from "../../../utils";
import { useLazyFetchUserQuery } from "../store/UserApiSlice";

export const useFindUserHandler = () => {
  const [triggerFetchUser, { isFetching, isLoading, data: user, error }] =
    useLazyFetchUserQuery();

  const [userId, setUserId] = useState<number>(0);
  const isUserSelected = userId !== 0;

  const onFindUserHandler = async (filters: IQuery) => {
    try {
      const result = await triggerFetchUser(BuildQuery(filters)).unwrap();
      toast.success("User is fetched successfully", {
        autoClose: 2000,
        hideProgressBar: true,
      });
      setUserId(result.data.userId);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      /* empty */
    }
  };

  return {
    onFindUserHandler,
    setUserId,
    userId,
    isFetching,
    isLoading,
    error,
    isUserSelected,
    user,
  };
};
