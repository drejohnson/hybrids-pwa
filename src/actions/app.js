export const UPDATE_PAGE = 'UPDATE_PAGE';

export const navigate = path => dispatch => {
  // Extract the page name from path.
  const page = path === '/' ? 'home' : path.slice(1);

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page));
};

const loadPage = page => dispatch => {
  switch (page) {
    case 'home':
      import('../views/home-view.js');
      break;
    case 'about':
      import('../views/about-view.js');
      break;
    default:
      page = 'notFound';
      import('../views/not-found-view.js');
  }

  dispatch(updatePage(page));
};

const updatePage = page => {
  return {
    type: UPDATE_PAGE,
    page
  };
};
