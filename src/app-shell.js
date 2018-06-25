import { html, define } from 'hybrids';
import connect from './connect';
import { store } from './store';

import './components/simple-counter';

const AppShell = {
  page: connect(
    store,
    state => state.app.page
  ),
  title: 'Hybrids PWA',
  render: ({ page, title }) => {
    return html`
    <style>
      :host {
        display: block;
        --app-drawer-width: 256px;

        --app-primary-color: #E91E63;
        --app-secondary-color: #293237;
        --app-dark-text-color: var(--app-secondary-color);
        --app-light-text-color: white;
        --app-section-even-color: #f7f7f7;
        --app-section-odd-color: white;

        --app-header-background-color: white;
        --app-header-text-color: var(--app-dark-text-color);
        --app-header-selected-color: var(--app-primary-color);
      }
      header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        text-align: left;
        background-color: var(--app-header-background-color);
        color: var(--app-header-text-color);
        border-bottom: 1px solid #eee;
      }
      [main-title] {
        font-family: 'Roboto';
        text-transform: lowercase;
        font-size: 30px;
        /* In the narrow layout, the toolbar is offset by the width of the
        drawer button, and the text looks not centered. Add a padding to
        match that button */
        padding-right: 44px;
      }
      nav > a {
        display: inline-block;
        color: var(--app-header-text-color);
        text-decoration: none;
        line-height: 30px;
        padding: 4px 24px;
      }
      nav > a[selected] {
        color: var(--app-header-selected-color);
        border-bottom: 4px solid var(--app-header-selected-color);
      }
      .main-content {
        padding: 0 1rem;
        padding-top: 64px;
        min-height: 100vh;
      }
      /* Wide layout: when the viewport width is bigger than 460px, layout
      changes to a wide layout. */
      @media (min-width: 460px) {
        .toolbar-list {
          display: block;
        }

        .main-content {
          padding-top: 107px;
        }
      }
    </style>
    <header>
      <div main-title>${title}</div>
      <nav>
        <a selected="${page === 'home'}" href="/">Home</a>
        <a selected="${page === 'about'}" href="/about">About</a>
      </nav>
    </header>
    <main class="main-content">
      ${page === 'home' && html`<home-view class="page"></home-view>`}
      ${page === 'about' && html`<about-view class="page"></about-view>`}
      ${page === 'notFound' &&
        html`<not-found-view class="page"></not-found-view>`}
    </main> 
  `;
  }
};

define('app-shell', AppShell);
