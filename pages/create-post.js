import React, { useEffect, useState } from "react";
import MasterLayout from "../Layouts/MasterLayout";
import Meta from "../components/Meta/Meta";
import LostPost from "../components/CreatePostComponent/LostPost";
import FoundPost from "../components/CreatePostComponent/FoundPost";
import axios from "axios";
import publicApi from "../services/publicApi";

function CreatePost() {
  const [activeTab, setActiveTab] = useState("lost");

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [thanas, setThanas] = useState([]);

  const [divisions1, setDivisions1] = useState([]);
  const [districts1, setDistricts1] = useState([]);
  const [thanas1, setThanas1] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedThana, setSelectedThana] = useState(null);

  const [selectedDivision1, setSelectedDivision1] = useState(null);
  const [selectedDistrict1, setSelectedDistrict1] = useState(null);
  const [selectedThana1, setSelectedThana1] = useState(null);

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await publicApi.get("/api/division_list");
        if (response.status == 200) {
          const options = response.data.map((division) => ({
            value: division.id,
            label: division.name,
          }));
          setDivisions(options);
          setDivisions1(options);
        } else {
          console.log("Failed to fetch divisions");
        }
      } catch (error) {
        console.log("Error fetching divisions:", error);
      }
    };

    fetchDivisions();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedDivision) {
        try {
          const response = await publicApi.get(
            `/api/district_list/${selectedDivision.value}`
          );
          if (response.status === 200) {
            const options = response.data.map((district) => ({
              value: district.id,
              label: district.name,
            }));
            setDistricts(options);
            setSelectedDistrict(null); // Reset district selection when division changes
            setThanas([]); // Clear thanas when division changes
          } else {
            console.log("Failed to fetch districts");
          }
        } catch (error) {
          console.log("Error fetching districts:", error);
        }
      }
    };

    fetchDistricts();
  }, [selectedDivision]);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedDivision1) {
        try {
          const response = await publicApi.get(
            `/api/district_list/${selectedDivision1.value}`
          );
          if (response.status === 200) {
            const options = response.data.map((district) => ({
              value: district.id,
              label: district.name,
            }));
            setDistricts1(options);
            setSelectedDistrict1(null); // Reset district selection when division changes
            setThanas1([]); // Clear thanas when division changes
          } else {
            console.log("Failed to fetch districts");
          }
        } catch (error) {
          console.log("Error fetching districts:", error);
        }
      }
    };

    fetchDistricts();
  }, [selectedDivision1]);

  useEffect(() => {
    const fetchThanas = async () => {
      if (selectedDistrict) {
        try {
          const response = await publicApi.get(
            `/api/thana_list/${selectedDistrict.value}`
          );
          if (response.status === 200) {
            const options = response.data.map((thana) => ({
              value: thana.id,
              label: thana.name,
            }));
            setThanas(options);
          } else {
            console.log("Failed to fetch thanas");
          }
        } catch (error) {
          console.log("Error fetching thanas:", error);
        }
      }
    };

    fetchThanas();
  }, [selectedDistrict]);

  useEffect(() => {
    const fetchThanas = async () => {
      if (selectedDistrict1) {
        try {
          const response = await publicApi.get(
            `/api/thana_list/${selectedDistrict1.value}`
          );
          if (response.status === 200) {
            const options = response.data.map((thana) => ({
              value: thana.id,
              label: thana.name,
            }));
            setThanas1(options);
          } else {
            console.log("Failed to fetch thanas");
          }
        } catch (error) {
          console.log("Error fetching thanas:", error);
        }
      }
    };

    fetchThanas();
  }, [selectedDistrict1]);

  const getBanners = async (e) => {
    const response = await publicApi.get(`/api/thana_list/${id}`);
    if (response.status === 200) {
      setBanners(response.data.banners);
    } else {
      console.log("Server Error");
    }
  };

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
            Lost Post
          </div>

          <div
            onClick={() => setActiveTab("found")}
            className={`col-6 card link profile-update-tab text-center ${
              activeTab == "found" && "pt-active"
            }`}
          >
            Found Post
          </div>
        </div>

        <div className="py-5">
          <div className="">
            {activeTab == "lost" ? (
              <LostPost
                params={{
                  districts,
                  divisions,
                  thanas,
                  selectedDistrict,
                  setSelectedDistrict,
                  selectedDivision,
                  setSelectedDivision,
                  selectedThana,
                  setSelectedThana,

                  districts1,
                  divisions1,
                  thanas1,
                  selectedDistrict1,
                  setSelectedDistrict1,
                  selectedDivision1,
                  setSelectedDivision1,
                  selectedThana1,
                  setSelectedThana1,
                }}
              />
            ) : activeTab == "found" ? (
              <FoundPost
                params={{
                  districts,
                  divisions,
                  thanas,
                  selectedDistrict,
                  setSelectedDistrict,
                  selectedDivision,
                  setSelectedDivision,
                  selectedThana,
                  setSelectedThana,
                }}
              />
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
