"use client";

import { useState } from "react";
import {
  FormContainer,
  FormFieldset,
  FormLabel,
  FormField,
  FormGrid,
} from "@designsystem/form/components";
import {
  FormFileInput,
  FormInput,
  FormRadioGroup,
} from "@designsystem/form/inputs";
import H1 from "@designsystem/typography/H1";

const THEME_OPTIONS = ["light", "dark"];

type AccountSettings = {
  name?: string;
  email?: string;
  image?: string;
  darkMode?: boolean;
};

/**
 * @TODO
 * 1. this needs a form for the user to enter their info
 * 2. if no user matches the session user, create a new user. otherwise update the existing user
 */
export default function AccountSettings() {
  const [formValues, setFormValues] = useState<AccountSettings>({});

  const handleRadioChange = (value: string | number) => {
    const darkMode = value === "dark";
    setFormValues({ ...formValues, darkMode });
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex min-w-96 flex-col justify-evenly gap-10 rounded-3xl p-5 text-center shadow-lg">
        <H1>My Profile</H1>
        {/* <FormContainer> */}
        <FormFieldset>
          <FormGrid>
            {/* <FormField> */}
            <FormLabel>username</FormLabel>
            <FormInput name={"name"} type={"text"} />
            {/* </FormField> */}

            {/* <FormField> */}
            <FormLabel>email</FormLabel>
            <FormInput name={"email"} type={"text"} />
            {/* </FormField> */}

            {/* <FormField> */}
            <FormLabel>image</FormLabel>
            <FormFileInput name={"image"} />
            {/* </FormField> */}
          </FormGrid>

          <div className="flex w-full items-start justify-end gap-12">
            <FormLabel>theme</FormLabel>
            <FormRadioGroup
              items={THEME_OPTIONS}
              value={formValues.darkMode ? "dark" : "light"}
              handleChange={handleRadioChange}
              reverse
            />
          </div>
        </FormFieldset>
        {/* </FormContainer> */}
      </div>
    </div>
  );
}
