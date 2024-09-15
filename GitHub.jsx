import { useState } from "react";

const GitHub = () => {
  // State to store the GitHub username and user data
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch GitHub user data
  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      setUserData(data);
      setError(null);
    } catch (err) {
      setUserData(null);
      setError(err.message);
    }
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserData();
  };

  return (
    <div className="  h-50 bg-yellow-500 rounded-lg py-4 w-1/3 mx-auto my-10 flex  flex-col items-center justify-center">
      <h1 className="flex text-white items-center justify-center text-3xl">
        GitHub User Finder
      </h1>

      {/* Search form */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center px-8 py-8 "
      >
        <input
          className="bg-white rounded-lg"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="  Enter GitHub Username"
        />
        <button
          className=" h-6 w-20 border  rounded-lg  ml-3 bg-white text-center px-1"
          type="submit"
        >
          Search
        </button>
      </form>

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Displaying the user data */}
      {userData && (
        <div className="flex flex-col items-center justify-center px-8 py-0 ">
          <h2>{userData.login}</h2>
          <img
            src={userData.avatar_url}
            alt={userData.login}
            style={{ width: "150px", borderRadius: "50%" }}
          />
          <p>Followers: {userData.followers}</p>
          <p>Following: {userData.following}</p>
          <p>Public Repos: {userData.public_repos}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default GitHub;
