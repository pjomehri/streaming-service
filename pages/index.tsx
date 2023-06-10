import { getServerSideProps } from '@/lib/authUtils';
import Navbar from '@/components/navbar';
import MovieList from '@/components/movie-list';
import Billboard from '@/components/billboard';
import InfoModal from '@/components/info-modal';
import useInfoModalStore from '@/hooks/useInfoModalStore';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: myMovies = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModalStore();
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList title='Trending Now' data={movies} />
        <MovieList title='My List' data={myMovies} />
      </div>
    </>
  );
}

export { getServerSideProps };
