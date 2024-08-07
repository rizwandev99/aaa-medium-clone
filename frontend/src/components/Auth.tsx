import { SignupInput } from '@rizwandev99/medium-common';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';

export const Auth = ({ type }: { type: 'signup' | 'signin' }) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: '',
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === 'signup' ? 'signup' : 'signin'}`,
        postInputs
      );
      const jwt = await response.data;
      console.log('FE JWT', jwt);
      localStorage.setItem('token', jwt.token);
      navigate('/blogs');
    } catch (e) {
      console.log('ERROR', e);
    }
  }
  return (
    <div className='h-screen flex justify-center items-center'>
      <div>
        <div className='text-4xl font-semibold'>
          {type == 'signup' ? 'Create an Account' : 'Login to your account'}
        </div>
        <div className='text-slate-400 mb-4'>
          {type == 'signup'
            ? ' Already have an Account?'
            : 'Not have an account'}

          <Link
            to={type == 'signup' ? '/signin' : '/signup'}
            className='underline'
          >
            {type == 'signup' ? 'Sign in' : 'Sign up'}
          </Link>
        </div>
        {type == 'signup' ? (
          <LabelledInput
            label='Name'
            placeholder='Ram Singh'
            type='text'
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                name: e.target.value,
              });
            }}
          />
        ) : null}

        <LabelledInput
          label='Username'
          placeholder='Harkirat@gmail.com'
          type='text'
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              username: e.target.value,
            });
          }}
        />
        <LabelledInput
          label='Password'
          placeholder='123456'
          type='password'
          onChange={(e) => {
            setPostInputs({
              ...postInputs,
              password: e.target.value,
            });
          }}
        />
        <button
          onClick={sendRequest}
          type='button'
          className='w-full mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
        >
          {type == 'signup' ? 'Sign up' : 'Sign in'}
        </button>
      </div>
    </div>
  );
};

interface LabelledInputTypes {
  label: string;
  placeholder: string;
  //@ts-ignore
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
const LabelledInput = ({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputTypes) => {
  return (
    <div>
      <label className='block mb-2 text-md font-medium text-gray-900 '>
        {label}
      </label>
      <input
        type={type || 'text'}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
