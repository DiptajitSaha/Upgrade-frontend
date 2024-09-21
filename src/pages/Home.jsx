
import { useNavigate } from 'react-router-dom';
import SubHeader from '../components/SubHeader';
import FeaturesSection from '../components/FeaturesSection';

export const Home = () => {
  const navigate = useNavigate();
  const getStartedHandler = () => navigate('/browse');
  return (
    <div>
      <div className="text-center py-20  text-white">
        <h1 className="text-5xl font-bold mb-4">Shaping a world with reimagination.</h1>
        <div className='py-8'>
          <SubHeader text={'your imagination starts here...'}></SubHeader>
        </div>
        <div className="space-x-4">
          <button className="bg-purple-500 hover:bg-purple-700 text-white py-3 px-6 rounded" onClick={getStartedHandler}> Browse </button>
          <button className="bg-zinc-600 hover:bg-zinc-800 text-white py-3 px-6 rounded">Learn more</button>
        </div>
      </div>
      <div className="py-20 text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-around text-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">The lowest price</h3>
            </div>
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">The fastest on the market</h3>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">The most loved</h3>
            </div>
          </div>
        </div>
      </div>
      <FeaturesSection />
    </div>
  );
};

export default Home;
