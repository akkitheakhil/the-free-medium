import Head from 'next/head';

export default function Metatags({
    title = 'The Free Medium | Blogs for everyone',
    description = 'A free blogging app for everyone',
    image = 'https://firebasestorage.googleapis.com/v0/b/the-free-medium.appspot.com/o/feature.png?alt=media&token=66ce00eb-e247-4ea9-873a-df64c5476b1f',
}) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="The Free Medium" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
        </Head>
    );
}