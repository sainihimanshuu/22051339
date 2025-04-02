import { useEffect, useState } from "react";

interface Post {
  postId: string;
}

const TrendingPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/posts?type=popular"
        );
        const data = await response.json();
        setPosts(data.topPopularPosts);
      } catch (error) {
        console.error("Error fetching trending posts", error);
      }
    };
    fetchTrendingPosts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Trending Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.postId} className="p-4 border rounded shadow-md">
            <img
              src={`https://source.unsplash.com/300x200/?nature,technology`}
              alt="Post"
              className="rounded-md mb-2"
            />
            <p className="font-semibold">Post ID: {post.postId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingPosts;
