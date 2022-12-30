import Head from 'next/head'
import Link from 'next/link'
import posts from '../posts/posts.json'

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome to Next-blog!</title>
      </Head>
      <div className='mx-auto w-full max-w-2xl space-y-6 py-12'>
        <div className='text-center py-12 border-b'>
          <h1 className='text-6xl font-bold py-4 text-gray-700'>
            Next-blog
          </h1>
          <p className='text-2xl text-gray-500'>Hi thanks for coming Enjoy reading!</p>
        </div>
        <ul className='mx-auto'>
          {posts.map((item) => (
            <li key={item.id} className="border-b py-10">
              <Link href={item.link}>
                <h2 className='text-3xl font-bold text-gray-700 hover:underline decoration-gray-600'>{`${item.title}`}</h2>
              </Link>
              <p className='text-lg text-gray-500'>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
