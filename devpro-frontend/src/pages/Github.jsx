import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Github() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);

  const analyzeProfile = async () => {
    try {

      const userResponse = await axios.get(
        `https://api.github.com/users/${username}`
      );

      const repoResponse = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );

      setProfile(userResponse.data);

      const sortedRepos = repoResponse.data
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5);

      setRepos(sortedRepos);

    } catch (error) {
      alert("GitHub User Not Found");
    }
  };

  return (
    <div className="layout">

      <Sidebar />

      <div className="content">

        <h1>GitHub Analyzer</h1>

        <div className="github-search">

          <input
            type="text"
            placeholder="Enter GitHub Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <button
            onClick={analyzeProfile}
          >
            Analyze
          </button>

        </div>

        {profile && (

          <div className="profile-card">

            <img
              src={profile.avatar_url}
              alt="profile"
              width="120"
            />

            <h2>{profile.name}</h2>

            <p>{profile.bio}</p>

            <div className="stats">

              <div>
                Repositories
                <h3>{profile.public_repos}</h3>
              </div>

              <div>
                Followers
                <h3>{profile.followers}</h3>
              </div>

              <div>
                Following
                <h3>{profile.following}</h3>
              </div>

            </div>

            <a
              href={profile.html_url}
              target="_blank"
              rel="noreferrer"
            >
              View Profile On GitHub
            </a>

          </div>

        )}

        {repos.length > 0 && (

          <div>

            <h2>Top Repositories</h2>

            {repos.map((repo) => (

              <div
                className="repo-card"
                key={repo.id}
              >
                <h3>{repo.name}</h3>

                <p>
                  ⭐ {repo.stargazers_count}
                </p>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Repository
                </a>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Github;