const authMiddleware = (store) => (next) => (action) => {
  if (action.meta?.baseQueryMeta?.headers) {
    const token = localStorage.getItem("token");
    if (token) {
      action.meta.baseQueryMeta.headers.set("Authorization", `Bearer ${token}`);
    }
  }
  return next(action);
};

export default authMiddleware;
