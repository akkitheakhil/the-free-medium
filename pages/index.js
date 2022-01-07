import FeedPage from '@screens/Feed';
import { db, postToJSON, } from '@lib/firebase-helper';
import { getFirestore, collectionGroup, limit, orderBy, getDocs, query } from 'firebase/firestore';
import Metatags from '@components/Metatags';
import app from '@lib/firebase';

export async function getServerSideProps(context) {
  const queryColl = query(collectionGroup(getFirestore(app), 'posts'), orderBy('createdAt', 'desc'), limit(10));
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
