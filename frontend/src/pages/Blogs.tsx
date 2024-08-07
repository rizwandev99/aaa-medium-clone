import { AppBar } from '../components/AppBar';
import { BlogCard } from '../components/BlogCard';

export const Blogs = () => {
  return (
    <div>
      <AppBar />
      <div className='flex justify-center items-center flex-col'>
        <BlogCard
          authorName={'Raja Hindustani'}
          title={
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots'
          }
          content={
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using , making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for  will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'
          }
          publishedDate={'2 aug 2024'}
        />
        <BlogCard
          authorName={'Raja Hindustani'}
          title={
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots'
          }
          content={
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using , making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for  will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'
          }
          publishedDate={'2 aug 2024'}
        />
        <BlogCard
          authorName={'Raja Hindustani'}
          title={
            'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots'
          }
          content={
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using , making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for  will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'
          }
          publishedDate={'2 aug 2024'}
        />
      </div>
    </div>
  );
};
