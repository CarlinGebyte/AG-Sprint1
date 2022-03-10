const getOffers = async (url) => {
  const result = await fetch(url);
  const data = await result.json();

  return data;
};

export default getOffers;
