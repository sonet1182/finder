import axios from "axios";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { destroyToken, getToken } from "../services/auth/token";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfileSkeleton from "../components/ProfilePage/ProfileSkeleton";
import BottomNavigation from "../components/BottomNavigation";

const AuthLayout = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (getToken()) {
      axios
        .get("api/tutor/user_info")
        .then((res) => {
          if (res.data.status === 200) {
            router.push("/profile");
          } else {
            destroyToken();
            router.push("/auth/login");
          }
        })
        .catch((error) => {
          router.push("/auth/login");
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {loading ? <ProfileSkeleton /> : children}
      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default AuthLayout;
