import headful from 'headful';

export default () => ({
  get: host => host,
  connect: (host, key, invalidate) => {
    headful.default({
      title: host.title,
      description: host.description,
      url: host.url,
      image: host.image
    });
    invalidate;
  }
});
