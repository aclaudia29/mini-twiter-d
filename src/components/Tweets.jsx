import Tweet from "./Tweet"

function Tweets({ tweets, user }) {
    return tweets && tweets.map(item => (
        <Tweet tweet={item} user={user} />
      ))
}

export default Tweets
