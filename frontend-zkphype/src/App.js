import logo from './logo.svg';
import './App.css';
import TableTransaction from "./components/table";
import Navigation from "./components/navigation";
import { Grid } from '@mui/material';
import search from "./Assets/search.jpg"
import { Route, Routes } from 'react-router-dom';
import DetailPage from './pages/detailPage';
import Tablepage from './pages/tablePage';
function App() {
  return (
    <div className="App">
    
      <Routes>
    <Route path="/" element={ <Tablepage  />} />
    {/* // <Route path="/clientForm" element={ <ClientForm />} /> */}
    <Route path="/detailPage" element={ <DetailPage />} />
      {/* <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Gallery data={landingPageData.Gallery} />
      <Testimonials data={landingPageData.Testimonials} />
      <Team data={landingPageData.Team} />
      <Contact data={landingPageData.Contact} /> */}
 </Routes>
    </div>
  );
}

export default App;
