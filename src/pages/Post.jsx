import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  if (!post) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* TITLE + BUTTONS */}
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl font-bold leading-tight">{post.title}</h1>

        {isAuthor && (
          <div className="flex gap-2">
            <Link to={`/edit-post/${post.$id}`}>
              <button className="px-4 py-1.5 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-700">
                Edit
              </button>
            </Link>

            <button
              onClick={deletePost}
              className="px-4 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* IMAGE */}
      {post.featuredImage && (
        <div className="mb-6 overflow-hidden rounded-lg">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="w-full h-[400px] object-cover transition duration-300 hover:scale-[1.02]"
          />
        </div>
      )}

      {/* CONTENT */}
      <div className="prose max-w-none">{parse(post.content)}</div>
    </div>
  );
}
