import createExpoWebpackConfigAsync from "@expo/webpack-config";

export default async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ["@codler/react-native-keyboard-aware-scroll-view"],
      },
    },
    argv
  );
  return config;
}
