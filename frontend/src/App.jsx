import {useState} from "react";
import CoverPage from './CoverPage.jsx';
import HomePage from './HomePage.jsx';


function App() {
  const [page, setPage] = useState("cover");

  return (
    <>
      {page === "cover" && <CoverPage goToHome={() => setPage("home")} />}
      {page === "home" && <HomePage />}
      
    </>
  );
}

export default App;