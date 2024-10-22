import "bootstrap/dist/css/bootstrap.min.css";
import { createContext, useEffect, useState } from "react";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./asset/style.css";
import "../styles/globals.css";
import "../styles/customFont.css";
import axios from "axios";
import picon from "../public/favicon.ico";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { destroyToken, getToken } from "../services/auth/token";
import publicApi from "../services/publicApi";
import Image from "next/image";
import Meta from "../components/Meta/Meta";
library.add(faCheckSquare, faCoffee, faUser);

export const appContext = createContext();

//Backend Connection
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.baseURL = process.env.domain;

axios.interceptors.request.use(function (config) {
  const token = getToken();
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

const NoLayout = ({ children }) => children;

function MyApp({ Component, pageProps }) {
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState("");
  const [notification, setNotification] = useState(null);
  const [districts, setDistricts] = useState([]);

  const Layout = Component.Layout || NoLayout;

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.js");
    
    const parseJSONSafely = (data) => {
      try {
        return JSON.parse(data);
      } catch (error) {
        destroyToken();
      }
    };

    // Get and parse "user_data" from localStorage
    const userDataFromStorage = localStorage?.getItem("user_data");
    const parsedUserData = userDataFromStorage
      ? parseJSONSafely(userDataFromStorage)
      : destroyToken();

    setUserData(parsedUserData);
    setUserType(
      localStorage?.getItem("user_type")
        ? localStorage?.getItem("user_type")
        : ""
    );
    setNotification(localStorage?.getItem("notification"));
  }, []);

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);


  useEffect(() => {
    const storedDistricts = localStorage.getItem("districts");

    if (!storedDistricts) {
      getDistricts();
    } else {
      setDistricts(JSON.parse(storedDistricts));
    }
  }, []);

  const handleBeforeInstallPrompt = (event) => {
    event.preventDefault();
    setDeferredPrompt(event);
    setShowInstallPrompt(true);
  };

  const handleInstallClick = () => {
    if (deferredPrompt !== null) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
        setShowInstallPrompt(false);
      });
    }
  };

  const getDistricts = async (e) => {
    const response = await publicApi.get("api/district-list");
    if (response?.status === 200) {
      setDistricts(response.data.data);
    } else {
      console.log("Server Error");
    }
  };

  return (
    <appContext.Provider
      value={{
        userData,
        setUserData,
        userType,
        notification,
        setNotification,
        districts,
      }}
    >
      <Layout>
        <Meta/>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>


      {showInstallPrompt && (
        <div className="install-prompt">
          <div className="install-prompt-dialog text-center">
            <Image alt="" src={picon} height="50" width="50" />
            <h5 className="pb-3">
              Install{" "}
              <span className="text-purple"> &quot;Tutor Sheba&quot; </span> on
              your home screen
            </h5>
            <button
              className="btn btn-sm btn-success px-3"
              onClick={handleInstallClick}
            >
              Install
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => setShowInstallPrompt(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </appContext.Provider>
  );
}

export default MyApp;
