const filterByKey = (data, text) => {
  if (isNaN(text)) {
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.email.toLowerCase().includes(text.toLowerCase())
    );
  } else {
    return data.filter(
      (item) =>
        item._id.toString().includes(text) || item.age.toString().includes(text)
    );
  }
};

const filterByRegex = (data, text) => {
  const regex = new RegExp(text);
  return data.filter(
    (item) =>
      regex.test(item._id) ||
      regex.test(item.name) ||
      regex.test(item.age) ||
      regex.test(item.email) ||
      regex.test(item.id)
  );
};

const sortString = (item1, item2, key, direction) => {
  if (item1[key] < item2[key]) {
    return direction === "ascending" ? -1 : 1;
  }
  if (item1[key] > item2[key]) {
    return direction === "ascending" ? 1 : -1;
  }
  return 0;
};

const sortNumber = (item1, item2, key, direction) => {
  return direction === "ascending"
    ? item1[key] - item2[key]
    : item2[key] - item1[key];
};

export { filterByKey, filterByRegex, sortString, sortNumber };
