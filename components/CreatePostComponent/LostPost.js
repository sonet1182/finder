import Image from "next/image";
import React, { useState, useCallback, useEffect } from "react";
import { FaCloudUploadAlt, FaTrashAlt } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import ReactSelect from "react-select";

function LostPost({ params }) {
  const {
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
  } = params;

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [images, setImages] = useState([]);
  const [honour, setHounour] = useState("");
  const [note, setNote] = useState("");
  const [place, setPlace] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactPlace, setContactPlace] = useState("");

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

  const submitHandler = async () => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images[]", image.file);
    });

    await fetch("/api/upload-images", {
      method: "POST",
      body: formData,
    });
  };

  const formSubmitHandler = async (e) => {
    const formData = new FormData();

    formData.append("category", category);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("time", time);

    images.forEach((image) => {
      formData.append("images[]", image.file);
    });

    const response = await privateApi.post(
      "api/student/update_profile_photo",
      formData
    );

    if (response.status === 200) {
      const user_data = JSON.parse(localStorage.getItem("user_data")) || {};
      user_data.image = response.data.data;
      localStorage.setItem("user_data", JSON.stringify(user_data));

      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
      });

      window.location.reload();
    } else {
      alert("Sorry");
    }
  };

  return (
    <>
      <div className="mb-40">
        <h2 className="mt-5 mb-10">
          আপনি কি আপনার হারিয়ে যাওয়া জিনিসটি খুঁজছেন?
        </h2>
        <p className="font-md color-text-paragraph-2">
          তাহলে আপনার হারানো জিনিস/ব্যাক্তির তথ্য দিয়ে নিচের ফর্মটি পূরণ করুন।
          আপনার হারানো বিজ্ঞপ্তিটি আপনার হারানো জিনিস খুঁজে পেতে সাহায্য করবে।
        </p>

        <form
          className="contact-form-style mt-30"
          id="contact-form"
          onSubmit={formSubmitHandler}
        >
          <h4 className="mb-2">হারানো বস্তু/ব্যাক্তির বিবরণঃ</h4>
          <div
            className="row"
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
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setDescription(e.target.value)}
                >
                  {description}
                </textarea>
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
                    <p>Drag & drop some files here, or click to select files</p>
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
                          <FaTrashAlt />
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
                  হারানোর তারিখ (সাম্ভাব্য) <span className="required">*</span>
                </label>
                <input
                  className="font-sm color-text-paragraph-2"
                  name="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="input-style mb-20">
                <label htmlFor="s_districts">
                  হারানোর সময় (সাম্ভাব্য) <span className="required">*</span>
                </label>
                <input
                  className="font-sm color-text-paragraph-2"
                  name="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-4 col-md-4">
              <div className="input-style mb-20">
                <label htmlFor="s_divisions">
                  বিভাগ <span className="required">*</span>
                </label>
                <ReactSelect
                  options={divisions}
                  value={selectedDivision}
                  onChange={(option) => setSelectedDivision(option)}
                  placeholder="সিলেক্ট করুন"
                  className="font-sm"
                />
              </div>
            </div>

            <div className="col-lg-4 col-md-4">
              <div className="mb-20">
                <label htmlFor="s_districts">
                  জেলা <span className="required">*</span>
                </label>
                <ReactSelect
                  options={districts}
                  value={selectedDistrict}
                  onChange={(option) => setSelectedDistrict(option)}
                  placeholder="সিলেক্ট করুন"
                  className="font-sm"
                  isDisabled={!selectedDivision} // Disable if no division selected
                />
              </div>
            </div>

            <div className="col-lg-4 col-md-4">
              <div className="mb-20">
                <label htmlFor="s_thanas">
                  উপজেলা/থানা <span className="required">*</span>
                </label>
                <ReactSelect
                  options={thanas}
                  value={selectedDistrict && selectedThana}
                  onChange={(option) => setSelectedThana(option)}
                  placeholder="সিলেক্ট করুন"
                  className="font-sm"
                  isDisabled={!selectedDistrict} // Disable if no district selected
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="mb-20">
                <label htmlFor="s_districts">
                  হারানোর স্থান <span className="required">*</span>
                </label>
                <input
                  className="font-sm color-text-paragraph-2"
                  name="text"
                  type="text"
                  placeholder="রেলস্টেশন, হাসপাতাল, কলেজ, বাসস্টপেজ, শপিংমল এর নাম/ঠিকানা"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
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
                  value={honour}
                  onChange={(e) => setHounour(e.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="input-style mb-20">
                <label htmlFor="s_districts">
                  অতিরিক্ত সংযুতি / নোট <span className="required">*</span>
                </label>
                <input
                  className="font-sm color-text-paragraph-2"
                  name="text"
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </div>

            <h4 className="my-4">যোগাযোগের ঠিকানাঃ</h4>

            <div className="col-lg-4 col-md-4">
              <div className="input-style mb-20">
                <label htmlFor="s_divisions">
                  বিভাগ <span className="required">*</span>
                </label>
                <ReactSelect
                  options={divisions1}
                  value={selectedDivision1}
                  onChange={(option) => setSelectedDivision1(option)}
                  placeholder="সিলেক্ট করুন"
                  className="font-sm"
                />
              </div>
            </div>

            <div className="col-lg-4 col-md-4">
              <div className="mb-20">
                <label htmlFor="s_districts">
                  জেলা <span className="required">*</span>
                </label>
                <ReactSelect
                  options={districts1}
                  value={selectedDistrict1}
                  onChange={(option) => setSelectedDistrict1(option)}
                  placeholder="সিলেক্ট করুন"
                  className="font-sm"
                  isDisabled={!selectedDivision1} // Disable if no division selected
                />
              </div>
            </div>

            <div className="col-lg-4 col-md-4">
              <div className="mb-20">
                <label htmlFor="s_thanas">
                  উপজেলা/থানা <span className="required">*</span>
                </label>
                <ReactSelect
                  options={thanas1}
                  value={selectedDistrict1 && selectedThana1}
                  onChange={(option) => setSelectedThana1(option)}
                  placeholder="সিলেক্ট করুন"
                  className="font-sm"
                  isDisabled={!selectedDistrict1} // Disable if no district selected
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-6">
              <div className="input-style mb-20">
                <label htmlFor="s_districts">
                  সরাসরি যোগাযোগের স্থান <span className="required">*</span>
                </label>
                <input
                  className="font-sm color-text-paragraph-2"
                  name="text"
                  type="text"
                  placeholder="রেলস্টেশন, হাসপাতাল, কলেজ, বাসস্টপেজ, শপিংমল এর নাম/ঠিকানা"
                  value={contactPlace}
                  onChange={(e) => setContactPlace(e.target.value)}
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
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
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
                By clicking contact us button, you agree our terms and policy,
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
    </>
  );
}

export default LostPost;
