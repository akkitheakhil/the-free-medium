import Head from 'next/head'
import FeedPage from '@screens/Feed';
import { db, postToJSON } from '@lib/firebase-helper';
import { collectionGroup, limit, orderBy, getDocs, query } from 'firebase/firestore';
import Metatags from '@components/Metatags';

export async function getServerSideProps(context) {

  const collectionRef = collectionGroup(db, 'posts');
  const queryColl = query(collectionRef, orderBy('createdAt', 'desc'), limit(10));
  const snapshot = await getDocs(queryColl);
  const posts = snapshot.docs.map(postToJSON);
  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function Home({ posts }) {
  return (
    <div>
      <Metatags />
      <main>
        <FeedPage posts={posts}></FeedPage>
      </main>
    </div>
  )
}
