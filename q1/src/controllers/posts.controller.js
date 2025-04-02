const postsWithMostComments = [];

//first get all the users
//then iterate over the users and get the posts for each userId
//then iterate over the posts and get comments for each postId
//update postsWithMostComments

const updatePostsWithMostComments = async () => {
  const userDataResponse = await fetch(
    "http://20.244.56.144/evaluation-service/users",
    {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    }
  );
  const newUsers = await userDataResponse.json();
  const users = newUsers["users"];
  const userIds = Object.keys(users);
  for (const id of userIds) {
    const postsDataResponse = await fetch(
      `http://20.244.56.144/evaluation-service/posts/${id}/posts`,
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );
    const postsData = await postsDataResponse.json();
    for (const post of postsData.posts) {
      const postId = post.id;
      const commentsDataResponse = await fetch(
        `http://20.244.56.144/evaluation-service/posts/${postId}/comments`,
        {
          headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          },
        }
      );
      const commentsData = await commentsDataResponse.json();
      const noOfComments = commentsData["comments"].length;
      if (
        postsWithMostComments.length === 0 ||
        postsWithMostComments[postsWithMostComments.length - 1].noOfComments ===
          noOfComments
      ) {
        postsWithMostComments.push({
          postId,
          noOfComments,
        });
      } else if (
        noOfComments >
        postsWithMostComments[postsWithMostComments.length - 1].noOfComments
      ) {
        postsWithMostComments.length = 0;
        postsWithMostComments.push({
          postId,
          noOfComments,
        });
      }
    }
  }
};

updatePostsWithMostComments();
//polling to get latest data.
setInterval(updatePostsWithMostComments, 30000);

//iterate over the postsWithMostComments and return the postId(s)
const getTopOrLatestPosts = (req, res) => {
  const { type } = req.query;
  if (type === "popular") {
    const topPopularPosts = postsWithMostComments.map((post) => post.postId);
    return res.status(200).json({
      message: "top popular posts fetched successfully",
      topPopularPosts,
    });
  } else if (type === "latest") {
    //how to determine the latest post, no time stamp give in the posts data
  }
};

export { getTopOrLatestPosts };
