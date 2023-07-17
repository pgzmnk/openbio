import React, { useContext } from "react";
import Map from "./Map";
import { MapContext, MapGeometryContext } from "@/context/context";
import { FormDataType, FormProps } from "@/interfaces";
import { useSession, signIn, signOut } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";

const questions = [
  {
    text: "What's the prevailing type of grassland on this plot?",
    type: "select",
    options: ["Perennial grassland", "Forest", "Crops", "Other"],
  },
  {
    text: "Was the plot converted to permanent grassland in the last 20 years?",
    type: "boolean",
  },
];

function QuestionComponent({ question }) {
  return (
    <>
      <legend className="text-sm font-semibold leading-6 text-gray-900">
        {question.text}
      </legend>
      {question.type === "boolean" && (
        <input
          id="comments"
          name="comments"
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      )}

      {question.type === "select" && (
        <select
          id="comments"
          name="comments"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        >
          {question.options?.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </>
  );
}

export default function Form({ onSubmit }: FormProps) {
  const { mapGeometry } = useContext(MapGeometryContext);
  const { data: session } = useSession();
  const [formData, setFormData] = React.useState<FormDataType>({
    id: uuidv4(),
    name: "1",
    description: "1",
    geometry: JSON.stringify(mapGeometry),
    authorId: "default"
  });

  // Update formData when mapGeometry changes
  React.useEffect(() => {
    setFormData({ ...formData, geometry: JSON.stringify(mapGeometry) });
  }, [mapGeometry]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setFormData({ ...formData, authorId: session?.user?.email || "default" });
    event.preventDefault();
    onSubmit(formData);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              New Project
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Project Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="..."
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about the project.
                </p>
                <div className="mt-2">
                  <input
                    id="description"
                    type="textarea"
                    name="description"
                    // rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="..."
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Project Bounds
                </label>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Trace a polygon around the project site.
                </p>
                <div className="border border-black">
                  <Map />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Land characteristics
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              These approximations help you calculate the land's exposure to
              stressors.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex flex-col h-6 items-left">
                      {questions.map((question) => {
                        return <QuestionComponent question={question} />;
                      })}
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
