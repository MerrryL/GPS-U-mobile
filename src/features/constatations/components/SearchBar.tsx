import React from "react";
import { Text, SearchBar as Bar } from "react-native-elements";

export function SearchBar() {
  return (
    <Bar
      placeholder="Type Here..."
      // onChangeText={this.updateSearch}
      // value={search}
    />
  );
}
