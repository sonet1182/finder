import MainContent from "../components/MainContent";
import Meta from "../components/Meta/Meta";
import MasterLayout from "../Layouts/MasterLayout";

const Home = () => {
  return (
    <>
      <Meta title="হোম | খুঁজে নাও" />
      <MainContent />
    </>
  );
};

Home.Layout = MasterLayout;

export default Home;

