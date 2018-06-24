import { html, define } from 'hybrids';
import meta from '../meta';

const NotFoundView = {
  title: 'Not found',
  description: 'Page not found',
  head: meta(),
  render: ({ title }) => html`
    <style>
      h1 {
        font-family: Roboto, sans-serif;
        font-weight: 300;
        text-decoration: inherit;
        text-transform: inherit;
        margin: 0;
      }
    </style>
    <h1>${title}</h1> 
  `
};

export default define('not-found-view', NotFoundView);
