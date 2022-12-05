import React from "react";
import { useQuery, gql } from "@apollo/client";

const USERS_QUERY = gql`
  query UsersQuery {
    users {
      id
      name
    }
  }
`;

interface User {
  name: string;
}

export default function Users() {
  const { loading, error, data } = useQuery(USERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div>
      {data.users.map((user: User) => (
        <p key={user.name}>{user.name}</p>
      ))}
    </div>
  );
}
