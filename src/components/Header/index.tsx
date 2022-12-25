import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import styles from './header.module.scss';

// import logo from '../../../public/Logo.svg';

export default function Header(): ReactElement {
  const router = useRouter();

  return (
    <div className={styles.headerContainer}>
      <header>
        <Image
          src="/Logo.svg"
          alt="logo"
          width={250}
          height={48}
          onClick={() => router.push('/', '/', {})}
        />
      </header>
    </div>
  );
}
