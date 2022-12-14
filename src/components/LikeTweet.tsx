import { gql, useMutation } from "@apollo/client"
import { TWEETS_QUERY } from "./AllTweets"
import { ME_QUERY } from "../pages/Profile"

const LIKE_TWEET_MUTATION = gql`
	mutation likeTweet($tweetId: Int!) {
		likeTweet(tweetId: $tweetId) {
			id
		}
	}
`

interface Props {
	tweetId: number
}

export default function LikeTweet({ tweetId }: Props) {
	const [ likeTweet ] = useMutation(LIKE_TWEET_MUTATION, {
		refetchQueries: [ { query: TWEETS_QUERY }, { query: ME_QUERY } ]
	})

	const handleCreateLike = async () => {
		await likeTweet({
			variables: { tweetId }
		})
	}

	return (
		<span onClick={handleCreateLike} style={{ marginRight: "5px" }}>
			<i className="far fa-thumbs-up" aria-hidden="true" />
		</span>
	)
}