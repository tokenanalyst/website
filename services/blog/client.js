import GhostContentAPI from '@tryghost/content-api';

const api = new GhostContentAPI({
  url: 'https://tokenanalyst.ghost.io',
  key: '9bfd4d6b00b7b21365b4d05822',
  version: 'v2',
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
