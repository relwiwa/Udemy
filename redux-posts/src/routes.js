import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostsIndex from './components/posts-index';
import PostsNew from './components/posts-new';
import PostsShow from './components/posts-show';

const Greeting = () => {
  return <div>Hey there!</div>;
}

export default (
  <Route path="/" component={App}>
    {/* IndexRoute matches, when none of the other child routes match */}
    <IndexRoute component={PostsIndex} />
    <Route path="posts/new" component={PostsNew} />
    <Route path="posts/:id" component={PostsShow} />
  </Route>
);
