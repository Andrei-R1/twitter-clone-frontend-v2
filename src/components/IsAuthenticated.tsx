import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Navigate, Outlet } from "react-router-dom";

const IS_LOGGED_IN = gql`
  {
    me {
      id
    }
  }
`;

interface Props {
  children?: React.ReactNode;
}

function IsAuthenticated({ children }: Props) {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return data.me ? (
    <Outlet/>
  ) : (
    <Navigate to="/login" replace={true} />
  );
}

export default IsAuthenticated;