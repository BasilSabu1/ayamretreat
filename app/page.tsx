// import Image from "next/image";
// import Header from "@/app/components/header/Header";
import Banner from "@/app/components/banner/Banner";
import Aboutus from "@/app/components/aboutus/Aboutus";
import Philosophy from "@/app/components/ourphilosophy/Philosophy";
import Review from "@/app/components/review/Review";
// import Footer from "@/app/components/footer/Footer";

export default function Home() {
  return (
    <div className="">
      {/* <Header /> */}
      <Banner />
      <Aboutus />
      <Philosophy />
      <Review />
      {/* <Footer /> */}
    </div>
  );
}
