import { Link } from 'react-router-dom';

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className='border-b border-slate-300 p-2 max-w-lg w-screen'>
        <div className='flex items-center pb-2'>
          <div className='flex'>
            <Avatar author={authorName} />
          </div>
          <div className='font-extralight pl-2'>{authorName}</div>
          <div className='pl-2'>
            <Circle />
          </div>
          <div className='font-thin pl-2 text-slate-400'>{publishedDate}</div>
        </div>

        <div className='font-bold text-xl'>{title}</div>
        <div className='pt-2 font-light text-lg'>
          {content.slice(0, 200) + '...'}
        </div>
        <div className='text-slate-400 text-sm pt-2'>{`${Math.ceil(
          content.length / 100
        )} mins read`}</div>
      </div>
    </Link>
  );
};

function Circle() {
  return <div className='h-1 w-1 bg-slate-400 rounded-full'></div>;
}

export function Avatar({ author }: { author: string }) {
  return (
    <div className='relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600'>
      <span className='font-normal text-xs text-gray-600 dark:text-gray-300'>
        {author[0]}
      </span>
    </div>
  );
}
