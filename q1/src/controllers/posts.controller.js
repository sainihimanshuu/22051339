const postsWithMostComments = [];

const updatePostsWithMostComments = async () => {
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
      `http://20.244.56.144/evaluation-service/posts/${id}/posts`,
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );
    const postsData = postsDataResponse.json();
    for (post in postsData) {
      const postId = post["id"];
      const commentsData = await fetch(
        `http://20.244.56.144/evaluation-service/posts/${postId}/comments`,
        {
          headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          },
        }
      );
      const comments = commentsData.json();
      const noOfComments = comments["comments"].length;
      if (
        postsWithMostComments.length === 0 ||
        postsWithMostComments[postsWithMostComments.length - 1].noOfComments ===
          noOfComments
      ) {
        postsWithMostComments.push({
          postId: id,
          noOfComments,
        });
      } else if (
        noOfComments >
        postsWithMostComments[postsWithMostComments.length - 1].noOfComments
      ) {
        postsWithMostComments = [];
        postsWithMostComments.push({
          postId: id,
          noOfComments,
        });
      }
    }
  }
};

setInterval(updatePostsWithMostComments(), 30000);

const getTopOrLatestPosts = (req, res) => {
  const { type } = req.query;
  if (type == popular) {
    const topPopularPosts = [];
    for (post in postsWithMostComments) {
      topPopularPosts.push(post.postId);
      //now how do I retrieve post of this particular postId? No such api given
      //if there was an api end point top get post corresponding to postId, I would return that post
    }
    return res.status(200).json({
      message: "top popular posts fetched successfully",
      topPopularPosts,
    });
  } else if (type == latest) {
    //how to know which post is latest? the given getPosts api does not have any time key.
  }
};

export { getTopOrLatestPosts };
