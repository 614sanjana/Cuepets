import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import defaultImage from "../Assets/defaultImage.jpg";

const PetBlog = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newBlog, setNewBlog] = useState({
    blogTitle: "",
    blogDesc: "",
    blogContent: "",
  });
  const [expandedIndex, setExpandedIndex] = useState(null);

  const userId = localStorage.getItem("ownerID"); // Fetch userId from localStorage

  useEffect(() => {
    fetchUserBlogs();
  }, []);

  const fetchUserBlogs = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/blogs/getBlogs/${userId}`);
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching user blogs:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBlog = async () => {
    if (!newBlog.blogTitle || !newBlog.blogDesc || !newBlog.blogContent) {
      alert("Please fill in all fields.");
      return;
    }

    const blogData = {
      blogTitle: newBlog.blogTitle,
      blogDesc: newBlog.blogDesc,
      blogContent: newBlog.blogContent,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/v1/blogs/addBlogPosts/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        const addedBlog = await response.json();
        setArticles((prev) => [...prev, addedBlog]);
        setShowModal(false);
        setNewBlog({ blogTitle: "", blogDesc: "", blogContent: "" });
      } else {
        alert("Failed to add blog. Please try again.");
      }
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <div className="p-8 bg-gradient-to-br from-white to-blue-100 text-center font-sans animate-fadeIn">
      <button
        className="fixed top-5 left-5 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transform hover:-translate-x-1 transition-all"
        onClick={handleBackButton}
      >
        &larr; Back
      </button>

      <h1 className="text-4xl font-bold text-blue-600 mb-6">Your Pet Care Blogs</h1>
      <p className="text-lg text-gray-600 mb-8">
        Explore or share your knowledge about pet care.
      </p>

      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-blue-800 transition-all"
          onClick={() => setShowModal(true)}
        >
          +
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
        {articles.map((article, index) => (
          <div
            key={article.id}
            className="bg-white rounded-xl shadow-lg p-6 w-full sm:w-80 text-center transform transition-transform hover:-translate-y-2 hover:shadow-xl"
          >
            <img
              src={article.image || defaultImage}
              alt={article.title}
              className="w-full rounded-lg mb-4 transform transition-transform hover:scale-105"
            />
            <h3 className="text-xl font-semibold text-blue-600 mb-2">{article.blogTitle}</h3>
            <p className="text-gray-500 mb-4">{article.blogDesc}</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-800 transform hover:scale-105 transition-all"
              onClick={() => toggleReadMore(index)}
            >
              {expandedIndex === index ? "Show Less" : "Read More"}
            </button>
            {expandedIndex === index && (
              <div className="mt-4 bg-blue-50 p-4 rounded-lg shadow text-left">
                <h4 className="text-lg font-semibold text-blue-600 mb-2">Content:</h4>
                <p className="text-gray-600 whitespace-pre-wrap">{article.blogContent}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Add a New Blog</h2>
            <div className="mb-4">
              <input
                type="text"
                name="blogTitle"
                placeholder="Blog Title"
                value={newBlog.blogTitle}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="blogDesc"
                placeholder="Short Description"
                value={newBlog.blogDesc}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <textarea
                name="blogContent"
                placeholder="Write your blog content here."
                value={newBlog.blogContent}
                onChange={handleInputChange}
                rows="5"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
                onClick={handleAddBlog}
              >
                Add Blog
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetBlog;
