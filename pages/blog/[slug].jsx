import Head from 'next/head';
import { useRouter } from 'next/router';
import BlockContent from '@sanity/block-content-to-react';
import getYouTubeId from 'get-youtube-id';
import YouTube from 'react-youtube';
import Layout from '../../components/layout/Layout';

export async function getStaticPaths() {
  const query = JSON.stringify({
    query: `{
      allPost {
        _id
        slug {
          current
        }
      }
    }`,
  });

  const data = await fetch('https://sspj558i.api.sanity.io/v1/graphql/production/default', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SANITY_API_KEY}`,
    },
    method: 'POST',
    body: query,
  });

  const slugData = await data.json();

  const paths = slugData.data?.allPost
    .map((item) => ({
      params: { slug: item.slug.current },
    }))
    .filter((path) => path);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const query = JSON.stringify({
    query: `{
      allPost(where: {slug: {current: {eq: "${slug}"}}}) {
        _id
        slug {
          current
        }
        title
        author {
          name
        }
        excerpt
        mainImage
        categories {
          title
        }
        publishedAt
        bodyRaw
      }
    }`,
  });

  const data = await fetch('https://sspj558i.api.sanity.io/v1/graphql/production/default', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SANITY_API_KEY}`,
    },
    method: 'POST',
    body: query,
  });

  const postData = await data.json();
  const post = postData.data.allPost[0];

  return {
    props: { post },
  };
}

export default function Post({ post }) {
  const router = useRouter();

  const serializers = {
    types: {
      youtube: ({ node }) => {
        const { url } = node;
        const id = getYouTubeId(url);
        return <YouTube videoId={id} />;
      },
    },
  };

  return (
    <Layout>
      <Head>
        <title className="uppercase">{`${post.title}`}</title>
        <meta name="description" content={`Blog post about - ${post.title}`} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content={`${post.title}`} />
        <meta property="og:title" content={`${post.title}`} />
        <meta property="og:description" content={`Blog post about - ${post.title}`} />
        <meta property="og:image" content={`${post.mainImage}`} alt={`${post.title}`} />
        <meta property="og:url" content={`https://shootingsuppliesltd.co.uk${router.asPath}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta charSet="UTF-8" />
      </Head>
      <div className="mx-96 my-12">
        <article className="mt-4">
          <h1 className="text-3xl font-black uppercase">{post.title}</h1>
          <div className="prose prose-lg max-w-none">
            <BlockContent
              blocks={post.bodyRaw}
              imageOptions={{ w: 320, h: 240, fit: 'max' }}
              projectId="sspj558i"
              dataset="production"
              serializers={serializers}
            />
          </div>
        </article>
      </div>
    </Layout>
  );
}
