import React from "react";

import MainFeaturedPost from "./MainFeaturedPost";



const mainFeaturedPost = {
  title: "Practicing and Learning System",
  description:
    "Practicing and Learning System",
  image: "https://source.unsplash.com/random",
  imgText: "main image description",
  linkText: "Continue reading…",
};

export default function FirstPage() {
  return (
    <>
      <main>
        <MainFeaturedPost post={mainFeaturedPost} />
      </main>
    </>
  );
}
