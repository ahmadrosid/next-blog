import Head from 'next/head'
import posts from '../posts/posts.json'

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome to Title!</title>
      </Head>
      <div className='prose prose-sky lg:prose-lg mx-auto'>
        <div className='py-2'>
          <h1>
            Welcome to my Blog.
          </h1>
          <p>Hi thanks for coming Enjoy reading!</p>
        </div>
        <ul className='list-none'>
          {posts.map((item, index) => (
            <li key={item.id}>
              <a href={item.link}>
                <h2>{`${index + 1}. ${item.title}`}</h2>
              </a>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
