function Tweet({ tweet, user }) {
    return <div key={tweet.id}>
          <p>{tweet.nombre} </p>
          <a>{tweet.text} {tweet.email}</a>
          <img src={`${apiURL}/uploads/${tweet.image}`} alt=" " />
        </div>
}

export default Tweet
