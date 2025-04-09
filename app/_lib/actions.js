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

export async function deleteDream(id) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { error } = await supabase.from("dreams").delete().eq("id", id);

  if (error) {
    throw new Error("Dream could not be deleted");
  }

  revalidatePath("account/dreams");
}

export async function getMessage(messageId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("id", messageId)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getMessages(userId, role) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { userId: loggedUserId } = session.user;

  if (role === "admin") {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return [];
    }

    return data || [];
  } else {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", loggedUserId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return [];
    }

    return data || [];
  }
}

export async function createDreamInteraction(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { userId } = session.user;

  const newMessage = {
    user_id: userId,
    dream: formData.get("dream"),
    status: "delivered",
  };

  const { data, error } = await supabase.from("messages").insert([newMessage]);

  if (error) {
    console.error("Supabase error:", error.message);
    throw new Error("Failed to submit dream interaction: " + error.message);
  }

  return { seccess: true };
}

export async function changeMessageStatus(messageId) {
  try {
    const { data, error } = await supabase
      .from("messages")
      .update({ status: "seen" })
      .eq("id", messageId);

    if (error) {
      console.error("Error updating status:", error.message);
      return { success: false, error: error.message };
    }

    console.log("Message status updated:", data);
    return { success: true, data };
  } catch (err) {
    console.error("Error in changeMessageStatus:", err);
    return { success: false, error: err.message };
  }
}

export async function createAdminReply(formData, interactionId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { userId } = session.user;

  const { data: user, error: roleError } = await supabase
    .from("users")
    .select("role")
    .eq("id", userId)
    .single();

  if (roleError || user.role !== "admin") {
    throw new Error("You must be an admin to reply.");
  }

  const newReply = {
    interpretation: formData.get("interpretation"),
    status: "interpreted",
  };

  const { error } = await supabase
    .from("messages")
    .update(newReply)
    .eq("id", interactionId);

  if (error) {
    console.error("Error inserting admin reply:", error);
    throw new Error("Failed to submit admin reply");
  }

  return { success: true };
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account/dreams" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function getUserById(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }

  return data;
}
