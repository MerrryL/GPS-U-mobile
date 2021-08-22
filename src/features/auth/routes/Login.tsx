import { Layout } from '../components/Layout';
import { LoginForm } from '../components/LoginForm';
import React from "react";

export default function Login ({ navigation })  {
  return (
    <Layout title="Log in to your account">
      <LoginForm onSuccess={() => navigation.navigate('Home')} />
    </Layout>
  );
};
