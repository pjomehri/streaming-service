import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useBillboard = () => {
  const { data, error, isLoading } = useSWR('/api/movies/random', fetcher, {
    revalidateIfStale: false,
    revalidateOnReconnect: true,
    revalidateOnFocus: false,
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useBillboard;
