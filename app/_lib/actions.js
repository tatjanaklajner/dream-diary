"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { notFound, redirect } from "next/navigation";

export async function getDream(dreamId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { data, error } = await supabase
    .from("dreams")
    .select("*")
    .eq("id", dreamId)
    .eq("user_id", session.user.userId)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getDreams(date = null, userId) {
  const session = await auth();
  if (!session || !userId)
    throw new Error("User ID is required to fetch dreams");

  let query = supabase
    .from("dreams")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (date) {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    query = query.eq("date", formattedDate);
  }

  const { data, error } = await query;

  if (error) {
    return [];
  }

  return data || [];
}

export async function createDream(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const date = new Date(formData.get("date")).toISOString().split("T")[0];
  let imageUrl = null;

  const image = formData.get("image");
  if (image && image.name) {
    const fileName = `${session.user.userId}-${Date.now()}-${image.name}`;
    const { data, error } = await supabase.storage
      .from("dream-images")
      .upload(fileName, image);

    if (error) throw new Error("Image upload failed");

    imageUrl = supabase.storage.from("dream-images").getPublicUrl(fileName)
      .data.publicUrl;
  }

  const newDream = {
    user_id: session.user.userId,
    date,
    title: formData.get("title"),
    description: formData.get("description"),
    rating: formData.get("rating"),
    vividness: formData.get("vividness"),
    image: imageUrl,
    type: formData.get("type"),
  };

  const { error } = await supabase.from("dreams").insert([newDream]);

  if (error) {
    console.error("Error inserting dream:", error);
    throw new Error("Failed to save dream");
  }

  return { success: true };
}

export async function updateDream(dreamId, formData) {
  const session = await auth();
  if (!session) throw new Error("You are not allowed to update this dream");

  let imageUrl = formData.get("image");

  if (imageUrl && imageUrl.name) {
    const fileName = `${session.user.userId}-${Date.now()}-${imageUrl.name}`;
    const { data, error } = await supabase.storage
      .from("dream-images")
      .upload(fileName, imageUrl);

    if (error) throw new Error("Image upload failed");

    imageUrl = supabase.storage.from("dream-images").getPublicUrl(fileName)
      .data.publicUrl;
  }

  const updatedDream = {
    date: formData.get("date"),
    title: formData.get("title"),
    description: formData.get("description"),
    rating: formData.get("rating"),
    vividness: formData.get("vividness"),
    image: imageUrl,
    type: formData.get("type"),
  };

  const { error } = await supabase
    .from("dreams")
    .update(updatedDream)
    .eq("id", dreamId)
    .single();

  if (error) throw new Error("Failed to update dream");

  return { success: true };
}

async function onSubmit(data) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => formData.append(key, value));
  if (image) formData.append("image", image);

  try {
    toast.success(
      dream ? "Dream updated successfully!" : "Dream created successfully!"
    );

    startTransition(true);

    let response;
    if (dream) {
      response = await updateDream(dream.id, formData);
    } else {
      response = await createDream(formData);
    }

    if (response.success) {
      reset();
      setTimeout(() => {
        onClose();
        window.location.href = "/account/dreams";
      }, 1000);
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong. Please try again";

    toast.error(errorMessage);
  } finally {
    startTransition(false);
  }
}

export async function deleteDream(id) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { error } = await supabase.from("dreams").delete().eq("id", id);

  if (error) {
    throw new Error("Dream could not be deleted");
  }

  revalidatePath("account/dreams");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account/dreams" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
