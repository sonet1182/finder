// components/MapEmbed.js
import { useEffect } from 'react';

const MapEmbed = () => {
  useEffect(() => {
    // Dynamically loading the external script
    const script = document.createElement('script');
    script.src = 'https://embedmaps.com/google-maps-authorization/script.js?id=1f950001890681ed14c4bf9854d3d9ea61f55043';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <iframe
        width="520"
        height="400"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        id="gmap_canvas"
        src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=Section-06,%20mirpur%20Dhaka+(Lost%20Passport%20here)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      ></iframe>
    </div>
  );
};

export default MapEmbed;
