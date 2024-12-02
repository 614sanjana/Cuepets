import React from 'react';
import { useHistory } from 'react-router-dom';

const BlogList = () => {
  // Sample blog data
  const posts = [
    {
      id: 1,
      title: 'Understanding React',
      shortDescription: 'React is a powerful JavaScript library for building user interfaces...',
      content: 'React is an open-source, front-end JavaScript library used for building user interfaces. It is maintained by Facebook and is used for building single-page applications by creating reusable UI components...',
    },
    {
      id: 2,
      title: 'Tailwind CSS: A Game Changer',
      shortDescription: 'Tailwind CSS is a utility-first CSS framework that makes it easy to design custom UIs...',
      content: 'Tailwind CSS is a utility-first CSS framework that makes it easy to create custom designs without writing custom CSS. It provides utility classes for almost every property, including padding, margins, colors, and more...',
    },
    {
      id: 3,
      title: 'JavaScript ES6 Features',
      shortDescription: 'ES6 introduces many new features to JavaScript, including arrow functions, destructuring, and more...',
      content: 'ES6, or ECMAScript 2015, is a major update to JavaScript that brings many new features such as arrow functions, let/const, promises, destructuring, and template literals...',
    },
  ];

  const history = useHistory();

  const handlePostClick = (postId) => {
    history.push(`/post/${postId}`);
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-semibold text-center mb-6">Blog Posts</h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer transition transform hover:scale-105"
            onClick={() => handlePostClick(post.id)}
          >
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p className="text-gray-600 mt-2">{post.shortDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
