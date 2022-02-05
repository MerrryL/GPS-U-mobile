import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useFollowup } from "../../hooks/useFollowup";
import { useUpdateFollowup } from "../../hooks/useUpdateFollowup";

type FollowupValues = {
  description: string;
};

interface CardHeaderProps {
  followupId: number;
}

const schema = yup.object().shape({
  description: yup.string().required(),
});

export function CardHeader({ followupId }: CardHeaderProps) {
  const followupQuery = useFollowup({
    followupId: followupId,
  });

  const [followup, setFollowup] = useState({
    description: followupQuery?.data?.description,
  });

  const updateFollowupMutation = useUpdateFollowup();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FollowupValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    console.log("here", values);
    await updateFollowupMutation.mutateAsync({
      data: values,
      followupId: followupId,
    });
    //onSuccess();
  };
  return <></>;
}
