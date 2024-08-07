import { Link } from 'react-router-dom';
import { Avatar } from './BlogCard';

export const AppBar = () => {
  return (
    <div className='border-b border-slate-300 p-4 flex justify-between items-center cursor-pointer'>
      <Link to={'/blogs'}>
        <div>Medium</div>
      </Link>
      <div>
        <Link to={'/publish'}>
          <button
            type='button'
            className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mr-4'
          >
            New
          </button>
        </Link>
        <Avatar author='Raja' />
      </div>
    </div>
  );
};
