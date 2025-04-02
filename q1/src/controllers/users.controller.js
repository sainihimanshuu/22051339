const usersWithHighesNoOfPosts = [];

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
    const noOfPosts = postsData["posts"].length;

    if (usersWithHighesNoOfPosts.length < 5) {
      usersWithHighesNoOfPosts.push({ userId: id, noOfPosts });
    } else {
      let minInd = 0;
      for (let i = 1; i < usersWithHighesNoOfPosts.length; i++) {
        if (
          usersWithHighesNoOfPosts[i].noOfPosts <
          usersWithHighesNoOfPosts[minInd].noOfPosts
        ) {
          minInd = i;
        }
      }
      if (noOfPosts > usersWithHighesNoOfPosts[minInd].noOfPosts) {
        usersWithHighesNoOfPosts[minInd] = { userId: id, noOfPosts };
      }
    }
  }
};

setInterval(updatePostsWithMostComments, 30000);

const getTopUsers = (req, res) => {
  const topUsers = usersWithHighesNoOfPosts.map((user) => user.userId);
  return res.status(200).json({
    message: "Top users with highest number of posts fetched successfully",
    topUsers,
  });
};

export { getTopUsers };
