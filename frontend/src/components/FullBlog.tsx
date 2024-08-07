import { Blog } from '../hooks';
import { AppBar } from './AppBar';
import { Avatar } from './BlogCard';

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <>
      <AppBar />
      <div className='grid grid-cols-12 px-10 pt-10'>
        <div className='col-span-8 '>
          <div className='font-extrabold text-3xl'>{blog.title}</div>
          <div>{blog.content}</div>
        </div>
        <div className='col-span-4  p-2 border-l border-slate-400'>
          <div className='text-slate-400 text-xl'>Author</div>
          <div className='flex '>
            <div className='flex justify-center flex-col pr-4'>
              <Avatar author={blog.author.name || 'Anonymous'} />
            </div>
            <div>
              <div className='text-xl font-bold'>
                {blog.author.name || 'Anonymous'}
              </div>
              <div>{blog.title}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
