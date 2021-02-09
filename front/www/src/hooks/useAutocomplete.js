export const useAutocomplete = (value, seed) => {
  const filterSeed = () => {
    if (value.length === 0) {
      return [];
    }
    return seed.filter((s) => s.value.toUpperCase().includes(value) || s.name.toUpperCase().includes(value));
  };
  return [filterSeed()];
};
