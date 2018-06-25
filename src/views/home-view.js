import { html, define } from 'hybrids';
import gql from 'graphql-tag';
import meta from '../meta';
import { client } from '../client';
import apollo from '../apollo';

import '../components/simple-counter';

const helloQuery = gql`
  {
    hello
  }
`;

const HomeView = {
  title: 'Home',
  description: 'Home Page',
  head: meta(),
  getHello: apollo(client)(helloQuery),
  render: ({ getHello, title }) => {
    return html`
    <style>
      h1, h2 {
        font-family: Roboto, sans-serif;
        font-weight: 300;
        text-decoration: inherit;
        text-transform: inherit;
        margin: 0;
      }
      h2 {
        margin-top: 1rem;
      }
    </style>
    <h1>${title}</h1> 
    <div>
      ${html.resolve(
        getHello
          .then(data => html`<h2>${data.hello}</h2>`)
          .catch(() => html`<div>Error!</div>`),
        html`Loading...`
      )}
    </div>
    <simple-counter></simple-counter>
  `;
  }
};

export default define('home-view', HomeView);
