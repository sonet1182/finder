// import { useAuth } from '@/hooks/auth'
import axios from "axios";
import logo from "../../assets/images/logo/logo.png";
import altImg from "../../assets/images/user.webp";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { destroyToken, getToken, saveData } from "../../services/auth/token";
import { useRef } from "react";
import FormData from "form-data";
import { toast } from "react-toastify";
import Image from "next/image";
import {
  FaBars,
  FaBell,
  FaCamera,
  FaCog,
  FaDashcube,
  FaPencilAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Modal } from "react-bootstrap";
import Link from "next/link";
import { appContext } from "../_app";
import ProfileSkeleton from "../../components/ProfilePage/ProfileSkeleton";
import Footer from "../../components/Footer";

export const affContext = createContext();

const ShebaUddoktaLayout = ({ children }) => {
  const value = useContext(appContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [show, setShow] = useState(false);

  const url = process.env.domain;

  const logoutController = (e) => {
    e.preventDefault();
    value.setUserData([]);
    destroyToken();
    router.push("/");

    axios.post(`api/partner/logout`).then((res) => {
      if (res.status) {
        value.setUserData([]);
        destroyToken();
        router.push("/");
      } else {
        alert("not ok");
      }
    });

    // destroyToken();
  };

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    if (getToken()) {
      setLoading(false);

      axios.get("api/partner/user_info").then((res) => {
        if (res.data.status === 200) {
          setUser(res.data.data);
          setLoading(false);
        } else {
          destroyToken();
          router.push("/uddokta/login");
        }
      });
    } else {
      destroyToken();
      router.push("/uddokta/login");
    }
  }, [trigger]);

  const [src, setSrc] = useState("");
  const filePro = useRef();
  const [imagedata, setImagedata] = useState("");

  const handleChange = (file) => {
    setSrc(URL.createObjectURL(file[0]));
    setDrawerOpen(false);
    setShow(true);
    setImagedata(file[0]);
  };

  useEffect(() => {
    setSrc(url + user?.profile_picture);
  }, [user?.profile_picture]);

  const formData = new FormData();
  formData.append("image", imagedata);

  const formSubmit = (e) => {
    setShow(false);

    axios.post("api/partner/update_profile_photo", formData).then((res) => {
      if (res.status === 200) {
        // setToggle(true);
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: true,
        });

        saveData(
          JSON.stringify(res.data.data),
          res.data.notification,
          res.data.user_type
        );
      } else {
        alert("Sorry");
      }
    });
  };

  const sidebar = (
    <div>
      <div className="mt-5">
        <a className="list-group-item list-group-item-action text-center">
          <div
            className="wrapper mt-10 mb-40 box-info-profie"
            style={{
              display: "flex",
              margin: "auto",
            }}
          >
            <div className="img-box" onClick={(e) => filePro.current.click()}>
              <input
                ref={filePro}
                onChange={(e) => handleChange(e.target.files)}
                multiple={false}
                type="file"
                hidden
              />
              <Image
                className="img-fluid avater-img-src"
                src={src}
                height={180}
                width={180}
                alt="photo"
                onError={(e) => setSrc(altImg)}
              />
            </div>
            <div className="text text-light text-center">
              <FaCamera />
            </div>

            <Modal
              show={show}
              onHide={() => setShow(false)}
              size="md"
              centered
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Body className="text-center py-5">
                <h3 className="pb-5">Are you sure to update Profile Photo？</h3>

                <div className="mt-3">
                  <button
                    className="btn btn-danger mx-1 px-5"
                    onClick={() => setShow(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-success mx-1 px-5"
                    onClick={formSubmit}
                  >
                    Confirm
                  </button>
                </div>
              </Modal.Body>
            </Modal>
          </div>

          <h6 className="text-center">{user?.name}</h6>
          <h6 className="text-center">(TSU-30{user?.id})</h6>
        </a>

        <span className="pc-hide">
          <Link passHref href="/uddokta/home">
            <span
              data-bs-toggle="offcanvas"
              data-bs-target="#sidebar"
              className="list-group-item list-group-item-action"
            >
              <FaDashcube /> Profile
            </span>
          </Link>

          <Link href="/uddokta/leads">
            <span
              data-bs-toggle="offcanvas"
              data-bs-target="#sidebar"
              className="list-group-item list-group-item-action"
            >
              <FaBell /> Lead
            </span>
          </Link>

          <Link href="/uddokta/refer">
            <span
              data-bs-toggle="offcanvas"
              data-bs-target="#sidebar"
              className="list-group-item list-group-item-action"
            >
              <FaUser /> Refer
            </span>
          </Link>

          <Link passHref href="/uddokta/profile_update">
            <span
              data-bs-toggle="offcanvas"
              data-bs-target="#sidebar"
              className="list-group-item list-group-item-action"
            >
              <FaPencilAlt /> Update Profile
            </span>
          </Link>

          <Link passHref href="/uddokta/terms_&_conditions">
            <span
              data-bs-toggle="offcanvas"
              data-bs-target="#sidebar"
              className="list-group-item list-group-item-action"
            >
              <FaCog /> Terms & Conditions
            </span>
          </Link>
        </span>

        <span className="mb-hide">
          <Link passHref href="/uddokta/home">
            <span className="list-group-item list-group-item-action">
              <FaDashcube /> Profile
            </span>
          </Link>

          <Link href="/uddokta/leads">
            <span className="list-group-item list-group-item-action">
              <FaBell /> Lead
            </span>
          </Link>

          <Link href="/uddokta/refer">
            <span className="list-group-item list-group-item-action">
              <FaUser /> Refer
            </span>
          </Link>

          <Link passHref href="/uddokta/profile_update">
            <span className="list-group-item list-group-item-action">
              <FaPencilAlt /> Update Profile
            </span>
          </Link>

          <Link passHref href="/uddokta/terms_&_conditions">
            <span className="list-group-item list-group-item-action">
              <FaCog /> Terms & Conditions
            </span>
          </Link>
        </span>

        <a
          onClick={logoutController}
          className="list-group-item list-group-item-action link"
        >
          <FaSignOutAlt /> Logout
        </a>
      </div>
    </div>
  );

  return (
    <affContext.Provider value={{ user, setUser, trigger, setTrigger }}>
      <div>
        <nav className="navbar navbar-expand-lg bg-light shadow-sm navbar_bg">
          <span
            className="px-4 text-light text-bold pc-hide"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebar"
          >
            <FaBars />
          </span>

          <Link passHref href="/">
            <Image
              className="logo-nav px-2"
              width={180}
              height={58}
              src={logo}
              alt="logo"
            />
          </Link>
        </nav>

        {loading ? (
          <ProfileSkeleton />
        ) : (
          <>
            <div
              className="offcanvas offcanvas-start"
              tabIndex="-1"
              id="sidebar"
              aria-labelledby="sidebarLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="sidebarLabel">
                  Sidebar
                </h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">{sidebar}</div>
            </div>
            <div className="px-4">
              <div className="row flex-row-reverse">
                <div className="col-lg-9 col-md-12 col-sm-12 col-12 float-right fixed-scroll">
                  {children}
                </div>

                <div className="col-lg-3 col-md-12 col-sm-12 col-12 mb-hide fixed-scroll">
                  <div className="sidebar-shadow none-shadow mb-30">
                    {sidebar}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <Footer />
      </div>
    </affContext.Provider>
  );
};

export default ShebaUddoktaLayout;
