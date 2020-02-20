'use strict';

const React = require('react');
const siteConfig = require('../config.js');

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
const katexStylesheet = require('!css-loader!../static/css/katex/katex.min.css');

const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  const { useKatex } = siteConfig;

  if (useKatex) {
    setHeadComponents([
      React.createElement('style', {
        key: 'katex-inline-stylesheet',
        dangerouslySetInnerHTML: { __html: katexStylesheet.toString() }
      })
    ]);
  }

  /* setHeadComponents([ */
  /*   <script key="twitter-widget" src="https://platform.twitter.com/widgets.js" charSet="utf-8"/> */
  /* ]); */
};

module.exports = onRenderBody;
