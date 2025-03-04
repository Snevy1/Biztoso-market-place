import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "../common/formInputs/TextInput";
import TextareaInput from "../common/formInputs/TextareaInput";
import SubmitButton from "../common/formInputs/SubmitButton";
import ImageInput from "../common/formInputs/ImageInput";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { selectProfile } from "../../features/profiles/ProfileSlice";
import { setProfile } from "../../features/profiles/ProfileSlice";

const ProfileForm = () => {
  const dispatch = useDispatch()
  const profile = useSelector(selectProfile);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(profile?.imageUrl || "");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: profile || {},
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      if (imageUrl) {
        data.imageUrl = imageUrl;
      }

      const profileResponse = await fetch("http://localhost:5000/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!profileResponse.ok) {
        throw new Error("Failed to save profile");
      }

      const responseData = await profileResponse.json();
      console.log("Profile saved:", responseData);
      dispatch(setProfile(responseData));
      toast.success('Profile created successfully!')

      
      reset();
      setImageUrl("");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Current profile state:", profile);
  }, [profile])

  return (
    <div className="flex justify-center px-4 sm:px-6 lg:px-8 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl p-4 sm:p-6 lg:p-8 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 my-6"
      >
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:gap-8">
          <TextInput
            label="Business Name"
            name="title"
            register={register}
            errors={errors}
            required
            className="w-full"
            placeholder="Type the business Name"
          />
          <TextInput
            label="Location"
            name="location"
            register={register}
            errors={errors}
            required
            className="w-full"
            placeholder="Type the business Location"
          />
          <TextareaInput
            label="Description"
            name="description"
            register={register}
            errors={errors}
            required
            className="md:col-span-2 w-full"
          />
          <ImageInput
  label="Logo Image"
  imageUrl={imageUrl}
  onImageChange={setImageUrl}
  className="md:col-span-2 w-full"
/>

        </div>

        <div className="mt-6 flex justify-end">
          <SubmitButton
            title={loading ? "Saving..." : "Finish"}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2"
          />
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;


