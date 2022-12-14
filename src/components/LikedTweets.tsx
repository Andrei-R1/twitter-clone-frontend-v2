import { formatDistance, subDays } from "date-fns"
import React from "react"
import { Link } from "react-router-dom"

interface AllTweets {
	id: number
	content: string
	createdAt: Date
	likes: []
	comments: []
	tweet: any
	author: {
		id: number
		name: string
		profile: {
			avatar: string
		}
	}
}

export default function LikedTweets(tweets: any) {
	return (
        <div>
			{tweets.tweets.likedTweet.map((tweet: AllTweets) => (
				<div className="tweet-container" key={tweet.id}>
					<div className="tweet-header">
							<img
								src={tweet.tweet.author?.profile?.avatar}
								style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
								alt="avatar"
							/>

						<Link to={`/user/${tweet.tweet.author?.id}`}>
							<h4 className="name">{tweet.tweet.author?.name} </h4>

						</Link>
						<p className="date-time">
							{formatDistance(subDays(new Date(tweet.tweet.createdAt), 0), new Date())} ago
						</p>
					</div>
					<Link to={`/tweet/${tweet.tweet.id}`}>
						<p>{tweet.tweet.content}</p>
					</Link>

				</div>
			))}
		</div>
    )
}