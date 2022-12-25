import { GetStaticPaths, GetStaticProps } from 'next';
import { ReactElement } from 'react';

import { TiCalendarOutline } from 'react-icons/ti';
import { FiUser } from 'react-icons/fi';
import { FaRegClock } from 'react-icons/fa';

import Image from 'next/image';
import { RichText } from 'prismic-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import common from '../../styles/common.module.scss';

import Logo from '../../public/teste.jpg';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): ReactElement {
  return (
    <main className={common.main}>
      <div className={styles.banner}>
        <Image src={Logo} alt="Banner do post" width={2250} height={1390} />
      </div>
      <article className={styles.post}>
        <header>
          <h1>Criando um app CRA do zero</h1>
          <div className={common.info}>
            <span>
              <TiCalendarOutline size={20} style={{ marginRight: '.5rem' }} />
              {post.first_publication_date}
            </span>
            <span>
              <FiUser size={20} style={{ marginRight: '.5rem' }} />
              {post.data.author}
            </span>
            <span>
              <FaRegClock size={20} style={{ marginRight: '.5rem' }} />
              {post.data.author}
            </span>
          </div>
        </header>
        {post.data.content.map(content => (
          <section key={content.heading}>
            <h2>{content.heading}</h2>
            {content.body.map(body => (
              <p key={body.text}>{body.text}</p>
            ))}
          </section>
        ))}
      </article>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('publication');

  return {
    paths: [
      {
        params: {
          slug: posts.results[0].uid,
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient({});
  const response = await prismic.getByUID('publication', params.slug as string);

  const post: Post = {
    first_publication_date: format(
      new Date(response.first_publication_date),
      'd MMM YYY',
      {
        locale: ptBR,
      }
    ),
    data: {
      title: response.data.title,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content.map(content => ({
        heading: content.heading,
        body: content.body.map(body => ({ text: body.text })),
      })),
    },
  };

  return {
    props: {
      post,
      response,
    },
    revalidate: 6, // 5 minutes
  };
};
