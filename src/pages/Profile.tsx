import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateProfile from "../components/CreateProfile";
import Following from "../components/Following";
import LeftNav from "../components/LeftNav";
import LikedTweets from "../components/LikedTweets";
import PopularTweets from "../components/PopularTweets";
import UpdateProfile from "../components/UpdateProfile";
import "../styles/primary.css";
import "../styles/profile.css";

export const ME_QUERY = gql`
  query me {
    me {
      id
      name
      following {
        id
        followId
        name
        avatar
      }
      likedTweet {
        id
        tweet {
          id
          content
          createdAt
          author{
            id
            name
            profile{
              id
              avatar
            }
          }
        }
      }
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
        <div className="left">
          <LeftNav></LeftNav>
        </div>
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
              {data.me.profile?.avatar ? (
                <img
                  src={data.me.profile.avatar}
                  style={{ width: "150px", height: "150px" , borderRadius: "50%", objectFit: "cover"}}
                  alt="avatar"
                />
              ) : (
                <i className="fa fa-user fa-5x" aria-hidden="true"></i>
              )}
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
              <Following/>
              <p>384 followers</p>
            </div>
          </div>
          <LikedTweets tweets={data.me} />
        </div>
        <div className="right">
          <PopularTweets/>
        </div>
      </div>
    </>
  );
}

export default Profile;
