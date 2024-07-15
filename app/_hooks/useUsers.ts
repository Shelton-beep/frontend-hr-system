import { useState } from "react";

interface PostUserResponse {
  flag: boolean;
  message: string;
}

const useUsers = () => {
  const [userResponse, setUserResponse] = useState<PostUserResponse>();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  return { userResponse, error, loader, setUserResponse, setError, setLoader };
};

export default useUsers;
