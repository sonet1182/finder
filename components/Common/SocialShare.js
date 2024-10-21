import React from "react";

function SocialShare() {
  return (
    <>
      <h6 className="color-text-paragraph-2 d-inline-block d-baseline mr-10">
        Share this
      </h6>
      <a className="mr-5 d-inline-block d-middle share-icon" href="#">
        <img
          alt="facebook logo"
          src="https://cdn.iconscout.com/icon/free/png-256/facebook-logo-2019-1597680-1350125.png"
        />
      </a>

      <a className="d-inline-block d-middle share-icon" href="#">
        <img
          alt="WhatsApp icon"
          src="https://cdn.iconscout.com/icon/free/png-256/whatsapp-1653084-1402372.png"
        />
      </a>
    </>
  );
}

export default SocialShare;
