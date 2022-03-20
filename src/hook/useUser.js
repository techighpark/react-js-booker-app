import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { loggedInVar, userLogOut } from "../apollo";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
    }
  }
`;

function useUser() {
  const hasToken = useReactiveVar(loggedInVar);
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });
  useEffect(() => {
    if (data?.me === null) {
      userLogOut();
    }
  }, [data]);
  return { data };
}
export default useUser;
