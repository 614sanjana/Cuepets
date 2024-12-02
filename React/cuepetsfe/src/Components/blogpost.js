import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { postId } = useParams();

  // Sample blog data (same as in BlogList.js for simplicity)
  const posts = [
    {
      id: 1,
      title: 'Understanding React',
      content: 'React is an open-source, front-end JavaScript library used for building user interfaces. It is maintained by Facebook and is used for building single-page applications by creating reusable UI components...',
    },
    {
      id: 2,
      title: 'Tailwind CSS: A Game Changer',
      content: 'Tailwind CSS is a utility-first CSS framework that makes it easy to create custom designs without writing custom CSS. It provides utility classes for almost every property, including padding, margins, colors, and more...',
    },
    {
      id: 3,
      title: 'JavaScript ES6 Features',
      content: 'ES6, or ECMAScript 2015, is a major update to JavaScript that brings many new features such as arrow functions, let/const, promises, destructuring, and template literals...',
    },
  ];

  const post = posts.find((post) => post.id === parseInt(postId));

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="mt-4 text-gray-800">{post.content}</p>
      </div>
    </div>
  );
};

export default BlogPost;

