import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { appContext } from "../pages/_app";
import { destroyToken, getToken } from "../services/auth/token";
import BottomNavigation from "../components/BottomNavigation";
import Footer from "../components/Footer";
import ProfileSkeleton from "../components/ProfilePage/ProfileSkeleton";
import StudentSideNavbarNavbar from "../components/Student/StudentSideNavbar";
import StudentNavbar from "../components/Student/StudentNavbar";

export const userContext = createContext();

const StudentLayout = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [trigger, setTrigger] = useState(true);


  useEffect(() => {
    if (getToken()) {
      setLoading(false);

      axios.get("/sanctum/csrf-cookie").then((response) => {
        axios.get("api/student/user_info").then((res) => {
          if (res.data.status === 200) {
            setUser(res.data.data);
          } else {
            destroyToken();
            router.push("/auth/login");
          }
        });
      });
    } else {
      destroyToken();
      router.push("/auth/login");
    }
  }, [trigger]);

  useEffect(() => {
    const storedUserData = localStorage.getItem('user_data');
    const parsedUserData = JSON.parse(storedUserData);

    if (parsedUserData) {
      setUser(parsedUserData);
    }
  }, []);

  return (
    <userContext.Provider value={{ user, setUser, trigger, setTrigger }}>
      <div className="min-h-screen bg-gray-100">
        <StudentNavbar />
        {loading ? (
          <ProfileSkeleton />
        ) : (
          <>
            <main className="name">
              <section className="section-box mt-5">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-2 mb-hide">
                      <div className="sticky-sidenav">
                        <StudentSideNavbarNavbar user={user} />
                      </div>
                    </div>
                    <div className="col-md-10">{children}</div>
                  </div>
                </div>
              </section>
            </main>
          </>
        )}
        <Footer />
        <BottomNavigation />
      </div>
    </userContext.Provider>
  );
};

export default StudentLayout;
