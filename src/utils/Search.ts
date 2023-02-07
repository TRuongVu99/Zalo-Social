const searchItembyTitle = (items: any, key: any) => {
  return items.filter((item: any) =>
    item.label.toLowerCase().trim().includes(key.toLowerCase().trim()),
  );
};
export default searchItembyTitle;
