import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateReply from "../components/CreateReply";
import LeftNav from "../components/LeftNav";
import PopularTweets from "../components/PopularTweets";
import "../styles/home.css";
import "../styles/primary.css";

export const TWEET_QUERY = gql`
  query tweet($id: Int!) {
    tweet(id: $id) {
      id
      content
      author {
        id
        name
        profile {
          id
          avatar
        }
      }
      comments {
        id
        content
        createdAt
        user {
          id
          name
          profile {
            id
            avatar
          }
        }
      }
    }
  }
`;

type ParamType = {
  id: string;
};
interface CommentType {
  id: number;
  content: string;
  createdAt: Date;
  user: {
    id: number;
    name: string;
    profile: {
      id: number;
      avatar: string;
    };
  };
}

function SingleTweet() {
  const history = useNavigate();
  const { id } = useParams<ParamType>();

  const { loading, error, data } = useQuery(TWEET_QUERY, {
    variables: { id: parseInt(id) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      <div className="primary">
        <div className="left">
          <LeftNav />
        </div>
        <div className="home">
          <div className="home-header">
            <span className="back-arrow" onClick={() => history(-1)}>
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </span>
            <h3 className="home-title">Tweet</h3>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 8fr",
              marginTop: "10px",
              marginLeft: "10px",
            }}
          >
            <img
              src={data.tweet.author.profile?.avatar}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              alt="avatar"
            />
            <h5>{data.tweet.author.name}</h5>
          </div>
          <p
            style={{
              marginLeft: "20px",
              borderLeft: "1px solid var(--accent)",
              paddingLeft: "20px",
              height: "50px",
              marginTop: 0,
            }}
          >
            {data.tweet.content}
          </p>
          {data.tweet.comments.map((comment: CommentType) => (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 8fr",
                  marginTop: "10px",
                  marginLeft: "10px",
                }}
              >
                <img
                  src={comment.user.profile?.avatar}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  alt="avatar"
                />
                <h5>{comment.user.name}</h5>
              </div>
              <p>{comment.content}</p>
              <CreateReply
                name={comment.user.name}
                avatar={comment.user.profile?.avatar}
                id={data.tweet.id}
                comment={comment.content}
                commentId={comment.id}
              />
            </>
          ))}
        </div>
        <div className="right">
          <PopularTweets />
        </div>
      </div>
    </>
  );
}

export default SingleTweet;
