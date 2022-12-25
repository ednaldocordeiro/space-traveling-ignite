import Image from 'next/image';
import { ReactElement } from 'react';
import Logo from '../../public/Logo.svg';

import styles from './header.module.scss';

export default function Header(): ReactElement {
  return (
    <div className={styles.headerContainer}>
      <header>
        <Image src={Logo} alt="logo" />
      </header>
    </div>
  );
}
