const topComment = [];

const getComments = async () => {
  const userDataResponse = await fetch(
    "http://20.244.56.144/evaluation-service/users",
    {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    }
  );
  const newUsers = userDataResponse.json();
  const users = newUsers["users"];
  const userIds = Object.keys(users);
  for (id in userIds) {
    const postsDataResponse = await fetch(
      `http://20.244.56.144/evaluation-service/posts/${id}/posts`
    );
    const postsData = postsDataResponse.json();
    for (post in postsData) {
      const postId = post["id"];
      const commentsData = await fetch(
        `http://20.244.56.144/evaluation-service/posts/${postId}/comments`
      );
      const comments = commentsData.json();
      const noOfComments = comments["comments"].length;
      if (
        topComment.length == 0 ||
        topComment[topComment.length - 1].noOfComments == noOfComments
      ) {
        topComment.push({
          postId: id,
          noOfComments,
        });
      } else if (
        noOfComments > topComment[topComment.length - 1].noOfComments
      ) {
        topComment = [];
        topComment.push({
          postId: id,
          noOfComments,
        });
      }
    }
  }
};

setInterval(getComments(), 30000);

const getTopOrLatestPosts = () => {
  const { type } = req.query;
  if (type == popular) {
    const topPosts = [];
    for (post in topComment) {
      const postId = post.postId;
      //now how do I retrieve post of this particular postId? No such api given
      //if there was an api end point top get post corresponding to postId, I would return that post
    }
  } else if (type == latest) {
    //how to know which post is latest? the given getPosts api does not have any time key.
  }
};

export { getTopOrLatestPosts };
