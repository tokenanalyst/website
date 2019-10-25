import GhostContentAPI from '@tryghost/content-api';
import { GHOST_URL, GHOST_API_KEY, GHOST_VERSION } from '../../constants/ghost';

const api = new GhostContentAPI({
  url: GHOST_URL,
  key: GHOST_API_KEY,
  version: GHOST_VERSION,
});

export async function getPosts() {
  return await api.posts
    .browse({
      limit: 'all',
    })
    .catch(err => {
      console.error(err);
    });
}

export async function getSinglePost(postSlug) {
  return await api.posts
    .read({
      slug: postSlug,
    })
    .catch(err => {
      console.error(err);
    });
}
