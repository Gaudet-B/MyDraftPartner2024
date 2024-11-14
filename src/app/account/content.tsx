"use client";

import { useState } from "react";
import {
  FormContainer,
  FormFieldset,
  FormLabel,
  FormField,
  FormGrid,
  FormSeparator,
  FormSubmit,
} from "@designsystem/form/components";
import {
  FancyFileInput,
  FancyFormInput,
  FormFileInput,
  FormInput,
  FormRadioGroup,
} from "@designsystem/form/inputs";
import H1 from "@designsystem/typography/H1";
import { useAtom } from "jotai";
import { useThemeAtom } from "../dashboard/atoms";

const THEME_OPTIONS = ["light", "dark"];

type AccountSettings = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  darkMode?: boolean | null;
};

/**
 * @TODO
 * 1. this needs a form for the user to enter their info
 * 2. if no user matches the session user, create a new user. otherwise update the existing user
 */
export default function AccountSettings({ user }: { user?: AccountSettings }) {
  const [formValues, setFormValues] = useState<AccountSettings>(user || {});

  const handleFormChange = (name: string, value: string | number | boolean) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleRadioChange = (value: string | number) => {
    const darkMode = value === "dark";
    handleFormChange("darkMode", darkMode);
  };

  const [themeAtom] = useAtom(useThemeAtom);

  return (
    <div
      className={`flex h-full w-full grow flex-col items-center ${themeAtom === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
    >
      <div
        className={`flex min-w-96 flex-col justify-evenly gap-10 rounded-bl-3xl rounded-br-3xl p-5 text-center shadow-lg ${themeAtom === "dark" ? "bg-gray-900 text-gray-50" : "bg-white text-gray-900"}`}
      >
        <H1>My Profile</H1>
        <FormContainer>
          <FormFieldset>
            <FancyFormInput
              name={"name"}
              label={"username"}
              value={formValues.name ?? undefined}
              handleChange={handleFormChange}
              darkMode={themeAtom === "dark"}
            />

            <FancyFormInput
              name={"email"}
              label={"email"}
              value={formValues.email ?? undefined}
              handleChange={handleFormChange}
              darkMode={themeAtom === "dark"}
            />

            <FormField>
              <FancyFileInput
                name={"image"}
                label={"profile image"}
                handleChange={handleFormChange}
                darkMode={themeAtom === "dark"}
              />
            </FormField>

            <div
              className={`flex w-full items-start justify-start gap-12 pl-4 ${themeAtom === "dark" ? "text-gray-50" : ""}`}
            >
              <FormLabel light>theme</FormLabel>
              <FormRadioGroup
                items={THEME_OPTIONS}
                value={formValues.darkMode ? "dark" : "light"}
                handleChange={handleRadioChange}
                darkMode={themeAtom === "dark"}
                light
                reverse
              />
            </div>
          </FormFieldset>
          <FormSeparator />
          <FormSubmit
            text={"Save Changes"}
            darkMode={themeAtom === "dark"}
            withCancel
          />
        </FormContainer>
      </div>
    </div>
  );
}
