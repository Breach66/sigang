import { get, post, put, del } from "../../utils/request.js";
// 分类api
export const fetchCategory = async () => {
  return await get("/admin/category");
};
export const postCategory = async (params) => {
  return await post("/admin/category", params);
};
export const putCategory = async (id, params) => {
  return await put("/admin/category/" + id, params);
};
export const delCategory = async (id) => {
  return await del("/admin/category/" + id);
};
export const fetchBookList = async (params) =>
  await get("/admin/books", params);
// 图书api CRUD
export const fetchTextbook = async (params) => {
  return await get("/admin/textbook", params);
};
export const DelTextBook = async (tid) => {
  return await del("/admin/textbook/" + tid);
};
export const putTextBook = async (tid, name, price, quality, author) => {
  return await put("/admin/textbook/" + tid, name, price, quality, author);
};
//订单api
export const fetchOrder = async (params) => {
  return await get("/admin/order", params);
};
export const AddOrder = async (uid, orderData) => {
  return await post(`http://localhost:3000/admin/orders/${uid}`, orderData);
};
//用户api
export const Postuser = async (username, password) => {
  return await post("http://localhost:3000/admin/users", username, password);
};
