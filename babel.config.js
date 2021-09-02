module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "@babel/preset-typescript"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@": "./src",
            "react-native": "react-native-web",
            "react-native-maps": "react-native-web-maps",
          },
        },
      ],
    ],
  };
};
