const extra = {
  API_URL: "http://127.0.0.1:8000/",
  ENV: "test",
};

export default ({ config }) => {
  return {
    ...config,
    extra,
  };
};
