import { Avatar } from './BlogCard';

export const AppBar = () => {
  return (
    <div className='border-b border-slate-300 p-4 flex justify-between'>
      <div>Medium</div>
      <div>
        <Avatar author='Raja' />
      </div>
    </div>
  );
};
