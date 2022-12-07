import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateProfile from "../components/CreateProfile";
import UpdateProfile from "../components/UpdateProfile";
import "../styles/primary.css";
import "../styles/profile.css";

export const ME_QUERY = gql`
  query me {
    me {
      id
      name
      profile {
        id
        bio
        location
        website
        avatar
      }
    }
  }
`;

function Profile() {
  const history = useNavigate();
  const { data, loading, error } = useQuery(ME_QUERY);
  if (loading) return <div>Loading...</div>;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      <div className="primary">
        <div className="left">Left Nav</div>
        <div className="profile">
          <div className="profile-info">
            <div className="profile-head">
              <span className="back-arrow" onClick={() => history(-1)}>
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
              </span>
              <span className="nickname">
                <h3>{data.me.name}</h3>
              </span>
            </div>
            <div className="avatar">
              <i className="fa fa-user fa-5x" aria-hidden="true"></i>
            </div>
            <div className="make-profile">
              {data.me.profile ? <UpdateProfile /> : <CreateProfile />}
            </div>

            <h3 className="name">{data.me.name}</h3>

            {data.me.profile ? (
              <p>
                <i className="fas fa-link"> </i>{" "}
                <Link
                  to={{ pathname: `http://${data.me.profile.website}` }}
                  target="_blank"
                >
                  {data.me.profile.website}
                </Link>
              </p>
            ) : null}
            <div className="followers">
              <p>200 following</p>
              <p>384 followers</p>
            </div>
          </div>
        </div>
        <div className="right">
          Right
          {/* <PopularNetworks /> */}
        </div>
      </div>
    </>
  );
}

export default Profile;
