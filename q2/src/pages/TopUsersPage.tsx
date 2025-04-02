import { useEffect, useState } from "react";

interface User {
  userId: string;
}

const TopUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users`);
        const data = await response.json();
        setUsers(data.topUsers);
      } catch (error) {
        console.error("Error fetching top users", error);
      }
    };
    fetchTopUsers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Top 5 Users with Highest Posts
      </h1>
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.userId}
            className="p-4 border rounded shadow-md flex items-center"
          >
            <img
              src={`https://source.unsplash.com/50x50/?face`}
              alt="User"
              className="rounded-full mr-4"
            />
            <div>
              <p className="font-semibold">User ID: {user.userId}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsersPage;
