export const store = {
  group: Number(localStorage.getItem("group")) || 0,
  totalPage: 30,
  activePage: Number(localStorage.getItem("page")) || 1,
};
