import { html, define } from 'hybrids';
import meta from '../meta';

const AboutView = {
  title: 'About',
  description: 'About page',
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

define('about-view', AboutView);
export default AboutView;
