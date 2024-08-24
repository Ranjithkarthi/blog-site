import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  // Declaring a state variable called posts and initializing it to an empty array
  const [posts, setPosts] = useState([]);

  // Getting the current URL query string (if any) using the useLocation hook from react-router-dom
  const cat = useLocation().search;

  // Defining an effect that runs when the cat variable changes
  useEffect(() => {
    // Defining an asynchronous function called fetchData
    const fetchData = async () => {
      try {
        // Making an HTTP GET request to the server to retrieve posts data based on the cat variable
        const res = await axios.get(`/posts${cat}`);
        // Updating the posts state variable with the retrieved data
        setPosts(res.data);
      } catch (err) {
        // Logging any errors that occur during the request
        console.log(err);
      }
    };
    // Calling the fetchData function
    fetchData();
  }, [cat]); // Specifying that this effect should only run when the cat variable changes

  // Defining a helper function called getText that takes an HTML string and returns the text content
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  // Rendering the Home component
  return (
    <div className="home">
      <div className="posts">
        {/* Mapping over the posts state variable and rendering a Post component for each post */}
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="post-img">
                {/* Rendering the post image */}
                {post?.img ? (
                  <img
                    src={`/upload/${post.img}`} // Directly using the path from the public directory
                    alt="post cover"
                  />
                ) : (
                  <p>No image available</p> // Or another fallback UI
                )}
              </div>
              <div className="content">
                {/* Rendering a link to the post page */}
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                {/* Rendering the post description */}
                <p>{`${getText(post.desc).substring(0, 250)}...`}</p>
                {/* Rendering a button to read more */}
                <Link className="link" to={`/post/${post.id}`}>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available</p> // Fallback message for no posts
        )}
      </div>
    </div>
  );
};

export default Home;