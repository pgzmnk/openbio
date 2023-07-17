import React from "react";
import Form from "@/components/Form";
import { FormDataType } from "@/interfaces";
import Router from "next/router";

export default function Project() {
  async function handleSubmit(formData: FormDataType) {
    try {
      await fetch("/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      await Router.push(`/project/${formData.id}`);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div class="flex flex-col ">
      <Form onSubmit={handleSubmit} />
    </div>
  );
}
