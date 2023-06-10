import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';

// I can retrieve the same data useCurrentUser is fetching in getServerDideProps, I would have to convert the object to JSON or get Error serializing,
// since I can't pass objects, functions etc... over the network and then again convert it back to an object on the other side,
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permenent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
