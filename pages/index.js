import MainContent from "../components/MainContent";
import Meta from "../components/Meta/Meta";
import MasterLayout from "../Layouts/MasterLayout";

const Home = () => {
  return (
    <>
      <Meta title="Home | Tutor Sheba" />
      <MainContent />
    </>
  );
};

Home.Layout = MasterLayout;

export default Home;

