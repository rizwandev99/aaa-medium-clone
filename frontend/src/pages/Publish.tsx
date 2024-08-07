import { useNavigate } from 'react-router-dom';
import { AppBar } from '../components/AppBar';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { ChangeEvent, useState } from 'react';

export const Publish = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  return (
    <div>
      <AppBar />
      <div className='flex justify-center mt-4'>
        <div className='max-w-screen-lg w-full'>
          <div>
            <input
              type='text'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  outline-none block w-full p-2.5'
              placeholder='title'
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className='mt-4'>
            <TextArea
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          <button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                  title,
                  content: description,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem('token'),
                  },
                }
              );
              navigate(`/blog/${response.data.id}`);
            }}
            type='button'
            className='mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mr-4'
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

function TextArea({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <textarea
      rows={4}
      className='block p-2.5 outline-none w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 '
      placeholder='Write your thoughts here...'
      onChange={onChange}
    ></textarea>
  );
}
