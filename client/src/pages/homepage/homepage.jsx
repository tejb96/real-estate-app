import './homepage.scss';
import SearchBar from '../../components/searchBar/searchBar.jsx';


function Homepage(){
  return (
    <div className='homePage'>
        <div className='textContainer'>
            <div className='wrapper'>
                <h1 className='title'>
                    Find Your Dream Place
                </h1>
                <p>
                    Stuff about the company 
                </p>
                <SearchBar />
                <div className='boxes'>
                    <div className='box'>
                        <h1>20+</h1>
                        <h2>Years of Experience</h2>
                    </div>
                    <div className="box">
                        <h1>200</h1>
                        <h2>Award Gained</h2>
                    </div>
                    <div className="box">
                        <h1>2000+</h1>
                        <h2>Property Ready</h2>
                    </div>
                </div>
            </div>
        </div>
        <div className="imgContainer">
            <img src="/bg.png" alt="" />
        </div>
    </div>
  );
}

export default Homepage