const searchItembyTitle = (items, key) => {
  return items.filter(item =>
    item.label.toLowerCase().trim().includes(key.toLowerCase().trim()),
  );
};
export default searchItembyTitle;
