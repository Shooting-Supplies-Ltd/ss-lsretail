import Layout from '../../components/layout/Layout';
import PostCard from '../../components/PostCard';

export async function getStaticProps() {
  const query = JSON.stringify({
    query: `{
      allPost(sort: [ { publishedAt: DESC } ]) {
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

  const postsData = await data.json();
  const posts = postsData.data.allPost;

  return { props: { posts } };
}

const Blog = ({ posts }) => {
  console.log(posts);

  return (
    <Layout>
      <main className="my-28 mx-12">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {posts && posts.map((post) => <PostCard item={post} key={post._id} />)}
        </div>
      </main>
    </Layout>
  );
};

export default Blog;
