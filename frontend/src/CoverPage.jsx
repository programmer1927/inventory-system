import welcomePic from './CoverPageImg.jpg'
import CoverPageButton from './CoverPageButton.jsx'

function CoverPage({ goToHome }) {
    return(
        <div>
            <img src={welcomePic} alt="welcome picture" />
            <h3>Welcome to your Inventory!</h3>
            <CoverPageButton onClick={goToHome} />
        </div>
    );
}

export default CoverPage;