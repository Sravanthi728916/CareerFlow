import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    bio: "",
    profileImage: "",
  });

  const [file, setFile] = useState(null);

  // Load profile
  useEffect(() => {
    setProfile({
      fullName:
        localStorage.getItem("userName") || "",
      email:
        localStorage.getItem("email") || "",
      bio:
        localStorage.getItem("bio") || "",
      profileImage:
        localStorage.getItem("profileImage") || "",
    });
  }, []);

  // Handle text fields
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Save profile
  const handleSave = async () => {
    let imageUrl = profile.profileImage;

    try {
      // Upload image only if user selected one
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch(
          "http://localhost:8080/api/file/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        imageUrl = await uploadRes.text();
      }

      // Save profile in backend
      const res = await fetch(
        "http://localhost:8080/api/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...profile,
            profileImage: imageUrl,
          }),
        }
      );

      if (res.ok) {
        // Save locally for dashboard
        localStorage.setItem(
          "userName",
          profile.fullName
        );
        localStorage.setItem(
          "email",
          profile.email
        );
        localStorage.setItem(
          "bio",
          profile.bio
        );
        localStorage.setItem(
          "profileImage",
          imageUrl
        );

        alert("✅ Profile saved successfully!");
        navigate("/dashboard");
      } else {
        alert("❌ Failed to save profile");
      }
    } catch (error) {
      console.log(error);
      alert("❌ Something went wrong");
    }
  };

  return (
    <div className="layout">
      <div className="content">

        {/* Back Button */}
        <div
          style={{
            cursor: "pointer",
            fontWeight: "600",
            marginBottom: "20px",
          }}
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </div>

        <div className="profile-card">
          <h1>Profile Settings</h1>

          {/* Profile Image */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt="Profile"
                width="120"
                height="120"
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <img
                src={`https://ui-avatars.com/api/?name=${
                  profile.fullName || "User"
                }&background=6c4fff&color=fff`}
                alt="Avatar"
                width="120"
                height="120"
                style={{
                  borderRadius: "50%",
                }}
              />
            )}
          </div>

          {/* Upload Photo */}
          <input
            type="file"
            onChange={handleFileChange}
          />

          <br />
          <br />

          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            placeholder="Full Name"
          />

          <br />
          <br />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Email Address"
          />

          <br />
          <br />

          {/* Bio */}
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
            rows="5"
          />

          <br />
          <br />

          {/* Save Button */}
          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;