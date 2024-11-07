import { useState } from "react";
import Image from "next/image";
import demoImg from "../../assets/vector/fb_community.svg";
import { FaPhone } from "react-icons/fa";

const PostCard = () => {
  const [mainImage, setMainImage] = useState(demoImg);

  // List of small images
  const smallImages = [demoImg, demoImg, demoImg];

  // Function to handle image click
  const handleImageClick = (image) => {
    setMainImage(image);
  };

  return (
    <div className="container my-4">
      <div
        className="card p-4"
        style={{ borderRadius: "10px", backgroundColor: "#f8f9fa" }}
      >
        <div className="row">
          {/* Main Image Section */}
          <div className="col-md-4">
            <div className="mb-3 w-100">
              <Image
                src={mainImage}
                alt="Main image"
                // className="img-fluid w-100"
                sizes="100vw"
                style={{ borderRadius: "10px" }}
              />
            </div>
            {/* Small Images */}
            <div className="w-100">
              <div className="d-flex justify-content-between">
                {smallImages.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Small image ${index + 1}`}
                    width={100}
                    height={100}
                    style={{ cursor: "pointer", borderRadius: "5px" }}
                    onClick={() => handleImageClick(image)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Post Details Section */}
          <div className="col-md-8">
            <h3 className="fw-bold">Post Title</h3>
            <p className="text-muted">Category</p>
            <div className="d-flex align-items-center">
              <div
                className="img-placeholder-circle me-2"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#e0e0e0",
                }}
              ></div>
              <div className="mt-4">
                <p className="mb-0">Dianne Russell</p>
                <small className="text-muted">9 January, 2024</small>
              </div>
            </div>
            <div className="py-3">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                vel aliquam mauris, sit amet varius augue. Curabitur ultrices
                odio mauris, id mattis ante tempor ut. Cras pellentesque velit
                eu risus sagittis pretium. Nullam sodales lectus egestas feugiat
                convallis. Sed nisl lorem, rhoncus et dui eu, sodales porta
                nunc. Ut et ipsum neque. Vestibulum pharetra risus id sapien
                interdum, quis scelerisque augue tempus. Phasellus ut faucibus
                felis, vitae suscipit mauris.
              </p>
              <p>
                <strong>Phone:</strong> 123456789
              </p>
              <p>
                <strong>Location:</strong> 100/2, Outshout Road, Dhaka 1233
              </p>
            </div>
            <div className="d-flex">
              <button
                className="btn btn-primary me-2 px-5"
                style={{ borderRadius: "5px" }}
              >
                <FaPhone className="mb--3" /> Call
              </button>
              <button
                className="btn btn-outline-success"
                style={{ borderRadius: "25px" }}
              >
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
