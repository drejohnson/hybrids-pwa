import { html, define } from 'hybrids';
import meta from '../meta';

import '../components/simple-counter';

const HomeView = {
  title: 'Home',
  description: 'Home Page',
  head: meta(),
  render: ({ title }) => {
    return html`
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
    <simple-counter></simple-counter>
  `;
  }
};

export default define('home-view', HomeView);
