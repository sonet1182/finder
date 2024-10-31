import React, { useState } from "react";
import MasterLayout from "../Layouts/MasterLayout";
import Meta from "../components/Meta/Meta";
import LostPost from "../components/CreatePostComponent/LostPost";
import FoundPost from "../components/CreatePostComponent/FoundPost";

function CreatePost() {
  const [activeTab, setActiveTab] = useState("lost");

  return (
    <>
      <Meta title="Create Post | Khuje Now" />

      <div className="container">
        <div className="row mt-3">
          <div
            onClick={() => setActiveTab("lost")}
            className={`col-6 card link profile-update-tab text-center ${
              activeTab == "lost" && "pt-active"
            }`}
          >
            {/* <Image alt="image" src={eduIcon} height={50} width={50} /> */}
            Lost Post
          </div>

          <div
            onClick={() => setActiveTab("found")}
            className={`col-6 card link profile-update-tab text-center ${
              activeTab == "found" && "pt-active"
            }`}
          >
            {/* <Image alt="image" src={tutorIcon} height={50} width={50} /> */}
            Found Post
          </div>
        </div>

        <div className="py-5">
          <div className="">
            {activeTab == "lost" ? (
              <LostPost/>
            ) : activeTab == "found" ? (
              <FoundPost/>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

CreatePost.Layout = MasterLayout;

export default CreatePost;
