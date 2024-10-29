import React, { useCallback, useContext, useState } from "react";
import MasterLayout from "../Layouts/MasterLayout";
import Meta from "../components/Meta/Meta";
import { appContext } from "./_app";
import { useEffect } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt, FaTimes, FaTrashAlt } from "react-icons/fa";

function CreatePost() {
  const value = useContext(appContext);

  const [activeTab, setActiveTab] = useState("lost");
  const [errors, setErrors] = useState();
  const [studentName, setStudentName] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [images, setImages] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setImages((prev) => [...prev, { file, preview: reader.result }]);
        };
        reader.readAsDataURL(file);
      });
    }, []),
  });

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images[]", image.file);
    });

    await fetch("/api/upload-images", {
      method: "POST",
      body: formData,
    });
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
              <div className="mb-40">
                <h2 className="mt-5 mb-10">
                  আপনি কি আপনার হারিয়ে যাওয়া জিনিসটি খুঁজছেন?
                </h2>
                <p className="font-md color-text-paragraph-2">
                  তাহলে আপনার হারানো জিনিস/ব্যাক্তির তথ্য দিয়ে নিচের ফর্মটি পূরণ
                  করুন। আপনার হারানো বিজ্ঞপ্তিটি আপনার হারানো জিনিস খুঁজে পেতে
                  সাহায্য করবে।
                </p>

                {errors?.s_fullName && (
                  <div className="alert alert-danger">{errors.s_fullName}</div>
                )}
                {errors?.s_phoneNumber && (
                  <div className="alert alert-danger">
                    {errors.s_phoneNumber}
                  </div>
                )}
                {errors?.s_districts && (
                  <div className="alert alert-danger">{errors.s_districts}</div>
                )}
                {errors?.s_area && (
                  <div className="alert alert-danger">{errors.s_area}</div>
                )}

                <form
                  className="contact-form-style mt-30"
                  id="contact-form"
                  // onSubmit={submitHandler}
                >
                  <h4 className="mb-2">হারানো বস্তু/ব্যাক্তির বিবরণঃ</h4>
                  <div
                    className="row wow animate__ animate__fadeInUp animated"
                    data-wow-delay=".1s"
                    style={{
                      visibility: "visible",
                      animationDelay: "0.1s",
                      animationName: "fadeInUp",
                    }}
                  >
                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          ক্যাটেগরি <span className="required">*</span>
                        </label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="name"
                          placeholder="বস্তু > ইলেকট্রনিক্স পন্য > মোবাইল ফোন"
                          type="text"
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          বস্তু/ব্যক্তির নাম / ডকুমেন্টস এর নম্বর{" "}
                          <span className="required">*</span>
                        </label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="phone"
                          placeholder="নাম / নম্বর"
                          type="text"
                          value={studentPhone}
                          onChange={(e) => setStudentPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          বিস্তারিত বিবরণ <span className="required">*</span>
                        </label>
                        <textarea
                          rows={4}
                          placeholder="বস্তুর আকার, আকৃতি, পরিমান অথবা পরিমাপ, হারিয়ে যাওয়ার আগের অবস্থা, হারানোর সাম্ভাব্য কারণ, চেনার উপায় । । হারানো ব্যাক্তির বয়স, চেহারার গঠন, ঊচ্চতা, গায়ের রঙ, সাম্ভাব্য কারন, পরনের পোষাক, পোষাকের রঙ, সহজে চেনার উপায় ইত্যাদি ..."
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          ছবি <span className="required">*</span>
                        </label>
                        <div>
                          <div {...getRootProps({ className: "dropzone" })}>
                            <input {...getInputProps()} />
                            <FaCloudUploadAlt className="upload-icon" />
                            <p>
                              Drag & drop some files here, or click to select
                              files
                            </p>
                          </div>
                          <div className="preview-container">
                            {images.map((image, index) => (
                              <div key={index} className="preview-item">
                                <Image
                                  src={image.preview}
                                  alt="preview"
                                  height="100"
                                  width="100"
                                />
                                <button
                                  className="remove-button"
                                  onClick={() => removeImage(index)}
                                >
                                  <FaTrashAlt/>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          হারানোর তারিখ (সাম্ভাব্য){" "}
                          <span className="required">*</span>
                        </label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="date"
                          type="date"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          হারানোর সময় (সাম্ভাব্য){" "}
                          <span className="required">*</span>
                        </label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="time"
                          type="time"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          বিভাগ <span className="required">*</span>
                        </label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="text"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          জেলা <span className="required">*</span>
                        </label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="text"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          উপজেলা/থানা <span className="required">*</span>
                        </label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="text"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          হারানোর স্থান <span className="required">*</span>
                        </label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="text"
                          type="text"
                          placeholder="রেলস্টেশন, হাসপাতাল, কলেজ, বাসস্টপেজ, শপিংমল এর নাম/ঠিকানা"
                        />
                      </div>
                    </div>

                    <h4 className="my-4">অতিরিক্ত তথ্যঃ</h4>

                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          খোঁজ দানকারীর পুরস্কার/সম্মাননা{" "}
                          <span className="required">*</span>
                        </label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="text"
                          type="text"
                          placeholder="উদাহরণঃ নগদ ৬ হাজার টাকা"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          অতিরিক্ত সংযুতি / নোট{" "}
                          <span className="required">*</span>
                        </label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="text"
                          type="text"
                        />
                      </div>
                    </div>

                    <h4 className="my-4">যোগাযোগের ঠিকানাঃ</h4>

                    <div className="col-lg-4 col-md-4">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          বিভাগ <span className="required">*</span>
                        </label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="text"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          জেলা <span className="required">*</span>
                        </label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="text"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          উপজেলা/থানা <span className="required">*</span>
                        </label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="text"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          সরাসরি যোগাযোগের স্থান{" "}
                          <span className="required">*</span>
                        </label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="text"
                          type="text"
                          placeholder="রেলস্টেশন, হাসপাতাল, কলেজ, বাসস্টপেজ, শপিংমল এর নাম/ঠিকানা"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                      <div className="input-style mb-20">
                        <label htmlFor="s_districts">
                          মোবাইল নম্বর <span className="required">*</span>
                        </label>
                        <input
                          className="font-sm color-text-paragraph-2"
                          name="text"
                          type="text"
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <label className="ml-20">
                        <input
                          className="float-start mr-5 mt-6"
                          type="checkbox"
                          required
                        />{" "}
                        By clicking contact us button, you agree our terms and
                        policy,
                      </label>
                    </div>
                    <div className="col-md-12">
                      <button
                        className="submit btn btn-send-message px-4 mt-5"
                        type="submit"
                      >
                        সাবমিট
                      </button>
                    </div>
                  </div>
                </form>
                <p className="form-messege"></p>
              </div>
            ) : activeTab == "found" ? (
              <div className="mb-40">Found Things</div>
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
