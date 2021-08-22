import { Layout } from "../components/Layout";
import { RegisterForm } from "../components/RegisterForm";
import React from "react";

export default function Register({ navigation }) {
  return (
    <Layout title="Register your account">
      <RegisterForm onSuccess={() => navigation.navigate("Home")} />
    </Layout>
  );
}
