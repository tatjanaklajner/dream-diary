import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createDream, updateDream } from "@/app/_lib/actions";
import { toast } from "react-toastify";

function DreamForm({ dream, date, onClose }) {
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      date: dream?.date || date || "",
      title: dream?.title || "",
      description: dream?.description || "",
      rating: dream?.rating || "",
      vividness: dream?.vividness || "3",
      type: dream?.type || "",
    },
  });

  const [image, setImage] = useState(dream?.image || null);
  const [isPending, startTransition] = useState(false);

  useEffect(() => {
    if (dream) {
      setValue("date", dream.date);
      setValue("title", dream.title);
      setValue("description", dream.description);
      setValue("rating", dream.rating);
      setValue("vividness", dream.vividness);
      setValue("type", dream.type);
      setImage(dream.image || null);
    }
  }, [dream, setValue]);

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
        onClose();

        setTimeout(() => {
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

  return (
    <div className="p-8 bg-white rounded-xl shadow-2xl max-w-xl mx-auto mt-8 border border-gray-300">
      <h2 className="text-3xl font-semibold text-center text-[var(--primary-blue)] mb-8">
        {dream ? "Update Your Dream" : "Create a Dream"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col gap-6">
          <label className="text-lg font-semibold text-gray-700">Date</label>
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] transition duration-300"
          />

          <label className="text-lg font-semibold text-gray-700">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] transition duration-300"
          />

          <label className="text-lg font-semibold text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows="6"
            className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] transition duration-300"
          ></textarea>

          <label className="text-lg font-semibold text-gray-700">
            How was your sleep?
          </label>
          <select
            {...register("rating", { required: "Sleep rating is required" })}
            className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] transition duration-300"
          >
            <option value="">Select</option>
            <option value="terrible">Terrible</option>
            <option value="bad">Bad</option>
            <option value="okay">Okay</option>
            <option value="good">Good</option>
            <option value="great">Great</option>
          </select>

          <label className="text-lg font-semibold text-gray-700">
            How vivid was your dream?
          </label>
          <input
            type="range"
            min="1"
            max="5"
            {...register("vividness", {
              required: "Vividness rating is required",
            })}
            className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] transition duration-300"
          />

          <label className="text-lg font-semibold text-gray-700">
            Add an image (optional)
          </label>
          {image ? (
            <div className="flex flex-col items-center">
              <img
                src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                }
                alt="Current Dream"
                className="w-36 h-36 object-cover rounded-lg mb-4"
              />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="text-red-500 hover:text-red-700 transition duration-300"
              >
                Remove Image
              </button>
            </div>
          ) : (
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] transition duration-300"
            />
          )}

          <label className="text-lg font-semibold text-gray-700">
            Dream Type
          </label>
          <select
            {...register("type", { required: "Dream type is required" })}
            className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] transition duration-300"
          >
            <option value="">Select</option>
            <option value="normal">Normal</option>
            <option value="nightmare">Nightmare</option>
            <option value="lucid">Lucid</option>
            <option value="recurring">Recurring</option>
            <option value="prophetic">Prophetic</option>
            <option value="vivid">Vivid</option>
          </select>
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="submit"
            disabled={isPending}
            className="py-3 px-8 rounded-lg bg-[var(--primary-blue)] text-white hover:bg-[var(--secondary-blue)] focus:outline-none transition duration-300"
          >
            {isPending ? "Submitting..." : dream ? "Update Dream" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default DreamForm;
