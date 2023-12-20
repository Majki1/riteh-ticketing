//Welcome Page
import { Link } from 'react-router-dom';

const Welcome = ({userData}) => {


    return(
        <div>
        <div className="hero min-h-screen bg-base-100">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className='justify-content-start'>
              <h1 className="text-5xl bg-gradient-to-r from-green-400 to-blue-500 inline-block text-transparent bg-clip-text p-2 font-bold">Dobro došli {userData.username}</h1>
              <p className="py-6 px-2 text-white">RiTeh ticketing sustav</p>
              <Link className="btn bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500" to= '/Tickets'>Ticket</Link>
            </div>
          </div>
        </div>
        </div>
    );
};

export default Welcome;