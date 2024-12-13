const errorMiddleware = (store) => (next) => (action) => {
  if (action.type.endsWith("/rejected")) {
    const error = action.payload;
    if (error?.status === 401) {
      // Redirect unauthorized errors
      sessionStorage.setItem(
        "toastMessage",
        "You need to log in to access this page."
      );
      window.location.href = "/auth/login";
    } else if (error?.status === 403) {
      sessionStorage.setItem(
        "toastMessage",
        "You are not authorized to access this page."
      );
      window.location.href = "/unauthorized";
    } else if (error?.status === 500) {
      sessionStorage.setItem(
        "toastMessage",
        "An internal server error occurred."
      );
      window.location.href = "/error";
    }
  }
  return next(action);
};

export default errorMiddleware;
