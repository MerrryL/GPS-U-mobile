import { PencilIcon } from "@heroicons/react/solid";
import * as z from "zod";

import { Button } from "@/components/Elements";
import { Form, FormDrawer, InputField } from "@/components/Form";
import { TextAreaField } from "@/components/Form/TextareaField";
import { useAuth } from "@/lib/auth";

import { useUpdateProfile } from "../hooks/useUpdateProfile";

const schema = z.object({
  email: z.string().min(1, "Required"),
  first_name: z.string().min(1, "Required"),
  last_name: z.string().min(1, "Required"),
});

type ProfileValues = {
  email: string;
  first_name: string;
  last_name: string;
  bio: string;
};

export const UpdateProfile = () => {
  const { user } = useAuth();
  const updateProfileMutation = useUpdateProfile();

  return (
    <FormDrawer
      isDone={updateProfileMutation.isSuccess}
      triggerButton={
        <Button startIcon={<PencilIcon className="h-4 w-4" />} size="sm">
          Update Profile
        </Button>
      }
      title="Update Profile"
      submitButton={
        <Button form="update-profile" type="submit" size="sm" isLoading={updateProfileMutation.isLoading}>
          Submit
        </Button>
      }
    >
      <Form<ProfileValues, typeof schema>
        id="update-profile"
        onSubmit={async (values) => {
          await updateProfileMutation.mutateAsync({ data: values });
        }}
        options={{
          defaultValues: {
            first_name: user?.first_name,
            last_name: user?.last_name,
            email: user?.email,
            bio: user?.bio,
          },
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField label="First Name" error={formState.errors["first_name"]} registration={register("first_name")} />
            <InputField label="Last Name" error={formState.errors["last_name"]} registration={register("last_name")} />
            <InputField label="Email Address" type="email" error={formState.errors["email"]} registration={register("email")} />

            <TextAreaField label="Bio" error={formState.errors["bio"]} registration={register("bio")} />
          </>
        )}
      </Form>
    </FormDrawer>
  );
};
