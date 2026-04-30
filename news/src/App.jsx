import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Hero from "./components/HeroSection/Hero";
import BrakingNews from "./components/BrakingNews/BrakingNews";
import SportsNews from "./components/Sports/Sports";
import BusinessNews from "./components/BusinessNews/BusinessNews";
import InnovationNews from "./components/Innovation/InnovationNews";
import CultureNews from "./components/Culture/CultureNews";
import TravelNews from "./components/Travel/travelNews";
import EarthNews from "./components/Earth/EarthNews";
import WeatherNews from "./components/WeatherNews/WeatherNews";
import VideoNews from "./components/VideoNews/VideoNews";
import LiveNews from "./components/LiveNews/LiveNews";

import NewsNavbar from "./NewsPage/NewNev/NewsNavbar";
import About from "./National/About/About";
import TeamSection from "./National/TeamSection/TeamSection";
import ContactSection from "./National/ContactSection/ContactSection";
import AuthSection from "./National/AuthSection/AuthSection";

import CategoryDefault from "./International/Category Default/CategoryDefault";
import CategoryOne from "./International/CategoryOne/CategoryOne";
import CategoryTwo from "./International/CategoryTwo/CategoryTwo";
import CategoryThree from "./International/CategoryThree/CategoryThree";
import CategoryFour from "./International/CategoryFour/CategoryFour";

import BusinessSection from "./Business/BusinessSection/BusinessSection";
import MarketingSection from "./Business/Marketing/MarketingSection";

import StateSection from "./State/StateSection/StateSection";

import HealthSection from "./Health/HealthSection";
import SportSection from "./Sport/SportSection/SportSection";
import StandardPost from "./Sport/StandardPost/StandardPost";
import GalleryPost from "./Sport/GalleryPost/GalleryPost";
import VideoPost from "./Sport/VideoPost/VideoPost";
import AudioPostDetail from "./Sport/AudioPost/AudioPostDetail";
import RightSidebar from "./Sport/RightSidebar/RightSidebar";
import NoSlider from "./Sport/NoSlider/NoSlider";

import Shop from "./Story/Shop/Shop";
import SingleShopItem from "./Story/SingleShop/SingleShopItem";
import Cart from "./Story/Cart/Cart";
import Checkout from "./Story/Checkout/Checkout";
import MyAccount from "./Story/MyAccount/MyAccount";

import Live from "./Live/Live";
import WeatherPage from "./Weather/WeatherPage";

import Register from "./RegisterSing/Register/Register";
import SignIn from "./RegisterSing/SignIn/SignIn";

function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <BrakingNews />
              <SportsNews />
              <BusinessNews />
              <InnovationNews />
              <CultureNews />
              <TravelNews />
              <EarthNews />
              <VideoNews />
              <LiveNews />
              <WeatherNews />
            </>
          }
        />

        {/* PAGES */}
        <Route path="/news" element={<NewsNavbar />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<TeamSection />} />
        <Route path="/author" element={<AuthSection />} />
        <Route path="/contact" element={<ContactSection />} />

        {/* SPORT */}
        <Route path="/sport" element={<SportSection />} />
        <Route path="/StandardPost" element={<StandardPost />} />
        <Route path="/GalleryPost" element={<GalleryPost />} />
        <Route path="/VideoPost" element={<VideoPost />} />
        <Route path="/AudioPostDetail" element={<AudioPostDetail />} />
        <Route path="/RightSidebar" element={<RightSidebar />} />
        <Route path="/NoSlider" element={<NoSlider />} />

        {/* INTERNATIONAL */}
        <Route path="/CategoryDefault" element={<CategoryDefault />} />
        <Route path="/CategoryOne" element={<CategoryOne />} />
        <Route path="/CategoryTwo" element={<CategoryTwo />} />
        <Route path="/CategoryThree" element={<CategoryThree />} />
        <Route path="/CategoryFour" element={<CategoryFour />} />

        {/* BUSINESS */}
        <Route path="/Business" element={<BusinessSection />} />
        <Route path="/Marketing" element={<MarketingSection />} />

        {/* STATE */}
        <Route path="/State/*" element={<StateSection />} />

        {/* STORY */}
        <Route path="/Shop" element={<Shop />} />
        <Route path="/SingleShopItem" element={<SingleShopItem />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/MyAccount" element={<MyAccount />} />

        {/* AUTH */}
        <Route path="/Register/register" element={<Register />} />
        <Route path="/SignIn/signin" element={<SignIn />} />

        {/* LIVE & WEATHER */}
        <Route path="/Live" element={<Live />} />
        <Route path="/WeatherPage" element={<WeatherPage />} />

        {/* HEALTH */}
        <Route path="/Health/*" element={<HealthSection />} />

        {/* 🔥 MUST: FALLBACK ROUTE */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
