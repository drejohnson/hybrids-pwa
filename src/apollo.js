async function getQuery(client, query) {
  try {
    let result = await client.query({
      query: query
    });
    return result.data;
  } catch (err) {
    console.error(err);
  }
}

export default client => query => ({
  get: () => getQuery(client, query)
});
