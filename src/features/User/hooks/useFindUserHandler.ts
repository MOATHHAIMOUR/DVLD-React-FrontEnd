import { useState } from "react";
import { toast } from "react-toastify";
import { IQuery } from "../../../interfaces";
import { BuildQuery } from "../../../utils";
import { useLazyFetchUserQuery } from "../store/UserApiSlice";

export const useFindUserHandler = () => {
  const [triggerFetchUser, { isFetching, isLoading, data: user }] =
    useLazyFetchUserQuery();
  const [userId, setUserId] = useState<number>(0);
  const isUserSelected = userId !== 0;

  const onFindUserHandler = async (filters: IQuery) => {
    try {
      const result = await triggerFetchUser(BuildQuery(filters)).unwrap();
      console.log("id: " + result.data.userId);
      if (result) {
        toast.success("User is fetched successfully", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        setUserId(result.data.userId);
      }
    } catch {
      toast.error("User not found", {
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  return {
    onFindUserHandler,
    setUserId,
    userId,
    isFetching,
    isLoading,
    isUserSelected,
    user,
  };
};
