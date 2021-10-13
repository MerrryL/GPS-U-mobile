const extra = {
  //API_URL: "https://whispering-sands-75251.herokuapp.com/",
  API_URL: "http://127.0.0.1:8000/",
  ENV: "test",
};

export default ({ config }) => {
  return {
    ...config,
    extra,
    ios: {
      bundleIdentifier: "com.merrylane.GPS-U-MOBILE",
    },
    android: {
      package: "com.merrylane.GPSUMOBILE",
    },
  };
};
