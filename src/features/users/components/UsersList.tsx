import { Table, Spinner } from "@/components/Elements";
import { formatDate } from "@/utils/formatDate";

import { useUsers } from "../hooks/useUsers";
import { User } from "@/types";

import { DeleteUser } from "./DeleteUser";

export const UsersList = () => {
  const usersQuery = useUsers();

  if (usersQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!usersQuery?.data) return null;

  return (
    <Table<User>
      data={usersQuery?.data}
      columns={[
        {
          title: "First Name",
          field: "first_name",
        },
        {
          title: "Last Name",
          field: "last_name",
        },
        {
          title: "Email",
          field: "email",
        },
        {
          title: "Role",
          field: "role",
        },
        {
          title: "Created At",
          field: "createdAt",
          Cell({ entry: { createdAt } }) {
            return <span>{formatDate(createdAt)}</span>;
          },
        },
        {
          title: "",
          field: "id",
          Cell({ entry: { id } }) {
            return <DeleteUser id={id} />;
          },
        },
      ]}
    />
  );
};
