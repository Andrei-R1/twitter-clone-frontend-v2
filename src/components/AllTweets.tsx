import { gql, useQuery } from "@apollo/client";
import { formatDistance } from "date-fns";
import { subDays } from "date-fns/esm";
import React from "react";
import { ME_QUERY } from "../pages/Profile";
import "../styles/allTweets.css";
import DeleteLike from "./DeleteLike";
import LikeTweet from "./LikeTweet";

export const TWEETS_QUERY = gql`
  query TWEETS_QUERY {
    tweets {
      id
      createdAt
      content
      likes {
        id
      }
      author {
        id
        name
        profile {
          id
          avatar
        }
      }
    }
  }
`;

export default function AllTweets() {
  const { loading, error, data } = useQuery(TWEETS_QUERY);
  const {
    loading: meLoading,
    error: meError,
    data: meData,
  } = useQuery(ME_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  if (meLoading) return <p>Loading...</p>;
  if (meError) return <p>{meError.message}</p>;

  interface AllTweets {
    id: number;
    content: string;
    createdAt: Date;
    likes: [];
    author: {
      id: number;
      name: string;
      profile: {
        avatar: string;
      };
    };
  }

  interface LikedTweets {
    id: number;
    tweet: {
      id: number;
    };
  }

  return (
    <div>
      {data.tweets.map((tweet: AllTweets) => (
        <div className="tweet-container">
          <div className="tweet-header">
            <img
              src={tweet.author.profile.avatar}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              alt="avatar"
            />
            <h4 className="name">{tweet.author.name} </h4>
            <p className="date-time">
              {formatDistance(
                subDays(new Date(tweet.createdAt), 0),
                new Date()
              )}{" "}
              ago
            </p>
          </div>
          <p>{tweet.content}</p>
          <div className="likes">
            {meData.me.likedTweet
              .map((t: LikedTweets) => t.tweet.id)
              .includes(tweet.id) ? (
              <span>
                <DeleteLike
                  id={
                    meData.me.likedTweet.filter(
                      (like: LikedTweets) => like.tweet.id === tweet.id
                    )[0].id
                  }
                />
                {tweet.likes.length}
              </span>
            ) : (
              <span>
                <LikeTweet tweetId={tweet.id} />
                {tweet.likes.length}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
