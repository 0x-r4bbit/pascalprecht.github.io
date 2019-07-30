// @flow
import React from 'react';
import { getContactHref } from '../../../utils';
import styles from './Author.module.scss';
import { useSiteMetadata } from '../../../hooks';

const Author = () => {
  const { author } = useSiteMetadata();

  return (
    <div className={styles['author']}>
      <p className={styles['author__bio']}>
        Hi, <a href="/about" title="About Pascal">I'm Pascal</a> and this is my blog. I mostly write about code. <br/>
        You can follow me <a href={getContactHref('twitter', author.contacts.twitter)} rel="noopener noreferrer" target="_blank">on Twitter</a>.
      </p>
    </div>
  );
};

export default Author;
