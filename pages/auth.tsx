import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { signIn } from 'next-auth/react';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import Input from '@/components/input';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [variant, setVariant] = useState('login');

  //   const toggleVariant = useCallback(() => {
  //     setVariant((currentVariant) =>
  //       currentVariant === 'login' ? 'register' : 'login'
  //     );
  //   }, []);

  // const register = useCallback(async () => {
  //   try {
  //     await axios.post('/api/register', { email, name, password });
  //     login();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [email, name, password, login]);

  // const toggleVariant = () => {
  //   setVariant((currentVariant) =>
  //     currentVariant === 'login' ? 'register' : 'login'
  //   );
  // };
  // const login = useCallback(async () => {
  //   try {
  //     await signIn('credentials', {
  //       email,
  //       password,
  //       callbackUrl: '/profiles',
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [email, password]);

  const toggleVariant = () => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login'
    );
  };

  const login = async () => {
    if (!email || !password) {
      setErrorMessage('Please provide all required information.');
      return;
    }
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profiles',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const register = async () => {
    if (!email || !name || !password) {
      setErrorMessage('Please provide all required information.');
      return;
    }

    try {
      await axios.post('/api/register', { email, name, password });
      login();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='relative h-full w-full bg-[url(/images/hero.jpg)] bg-no-repeat bg-center bg-fixed bg-cover'>
      <div className='bg-black w-full h-full lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <img src='/images/logo.png' alt='Logo' className='h-12' />
        </nav>
        <div className='flex justify-center'>
          <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
            <h2 className='text-white text-4xl mb-8 font-semibold'>
              {variant === 'login' ? 'Sign in' : 'Create an account'}
            </h2>
            <div className='flex flex-col gap-4'>
              {variant === 'register' && (
                <Input
                  id='name'
                  label='Name'
                  onChange={(event: any) => {
                    setName(event.target.value);
                    setErrorMessage('');
                  }}
                  type='text'
                  value={name}
                />
              )}

              <Input
                id='email'
                label='Email'
                onChange={(event: any) => {
                  setEmail(event.target.value);
                  setErrorMessage('');
                }}
                type='email'
                value={email}
              />
              <Input
                id='password'
                label='Password'
                onChange={(event: any) => {
                  setPassword(event.target.value);
                  setErrorMessage('');
                }}
                type='password'
                value={password}
              />
            </div>
            <button
              onClick={variant === 'login' ? login : register}
              className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'
            >
              {variant === 'login' ? 'Login' : 'Register'}
            </button>
            {errorMessage && (
              <p className='text-neutral-200 mt-4'>{errorMessage}</p>
            )}
            <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
              <div
                onClick={() =>
                  signIn('google', {
                    callbackUrl: '/profiles',
                  })
                }
                className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className='text-neutral-500 mt-12'>
              {variant === 'login'
                ? 'First time using Netflix?'
                : 'Already have an account?'}
              <span
                onClick={toggleVariant}
                className='text-white ml-1 hover:underline cursor-pointer'
              >
                {variant === 'login' ? 'Sign up' : 'Sign in'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
