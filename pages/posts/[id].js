import Head from "next/head"
import { getBlogPostData, getAllBlogPostIds } from '../../lib/blog'

export async function getStaticPaths() {
  const paths = getAllBlogPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getBlogPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export default function DetailPost({ postData }) {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <div className="py-8">
        <article className="px-4">
          <div className="prose prose-sky lg:prose-lg  mx-auto">
            <a href="/" className="py-6 inline-block">Home</a>
            <h1 className="text-5xl font-bold">
              {postData.title}
            </h1>

            <div
              dangerouslySetInnerHTML={{ __html: postData.contentHtml }}>
            </div>
          </div>
        </article>
      </div>
    </>
  )
}