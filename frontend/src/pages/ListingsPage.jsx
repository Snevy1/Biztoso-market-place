import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  addListing,
  setListings,
  deleteListing,
  updateListing,
} from "../features/listings/ListingSlice";
import { setLeads, claimLead } from "../features/leads/LeadsSlice";
import toast from "react-hot-toast";
import { useFilteredLeads } from "../hooks/useFilter";

const ListingsPage = () => {
  const dispatch = useDispatch();
  const listings = useSelector((state) => state.listings.listings);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const [editId, setEditId] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [leadFilter, setLeadFilter] = useState("all");

  const filteredLeads = useFilteredLeads(leadFilter);

  useEffect(() => {
    fetch("http://localhost:5000/listings")
      .then((res) => res.json())
      .then((data) => dispatch(setListings(data)))
      .catch((err) => console.error("Failed to fetch listings:", err));

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) =>
        dispatch(setLeads(data.map((lead) => ({ ...lead, status: "new" }))))
      )
      .catch((err) => console.error("Failed to fetch leads:", err));
  }, [dispatch]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  /* Form Submission */
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    if (data.images) {
      Array.from(data.images).forEach((image) =>
        formData.append("images", image)
      );
    }

    try {
      if (editId) {
        await fetch(`http://localhost:5000/listings/${editId}`, {
          method: "PUT",
          body: formData,
        })
          .then((res) => res.json())
          .then((updatedListing) => {
            dispatch(updateListing(updatedListing));
            toast.success("Listing updated successfully!");
          });
      } else {
        formData.append("id", new Date().getTime());
        await fetch("http://localhost:5000/listings", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((newListing) => {
            dispatch(addListing(newListing));
            toast.success("Listing created successfully!");
          });
      }
      reset();
      setEditId(null);
      setImagePreviews([]);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save listing.");
    }
  };

  /* Delete a listing */
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/listings/${id}`, { method: "DELETE" });
      dispatch(deleteListing(id));
      toast.success("Listing deleted successfully!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to delete listing.");
    }
  };

  // Claim a lead
  const handleClaimLead = (id) => {
    dispatch(claimLead(id));
    toast.success("Lead claimed successfully!");
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Marketplace Listings 🛒📈</h2>

      {/* Listing Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          {...register("name", { required: "Product name is required" })}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Price"
          step="0.01"
          {...register("price", {
            required: "Price is required",
            min: { value: 0, message: "Price must be positive" },
          })}
          className="border p-2 w-full rounded"
        />
        <input
          type="file"
          multiple
          accept="image/*"
          {...register("images")}
          onChange={handleImageChange}
          className="border p-2 w-full rounded"
        />
        <div className="flex gap-2 flex-wrap mt-2">
          {imagePreviews.map((preview, idx) => (
            <img key={idx} src={preview} alt="Preview" className="w-20 h-20 object-cover rounded" />
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editId ? "Update Listing" : "Add Listing"}
        </button>
      </form>

      {/* Listings Display */}
      <h3 className="text-xl font-bold mb-2">Existing Listings</h3>
      <ul className="space-y-4">
        {listings.map((listing) => (
          <li
            key={listing.id}
            className="border p-4 rounded flex justify-between items-center gap-4"
          >
            <div className="flex items-center gap-4">
              {/* Display Images */}
              {listing.images && listing.images.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {listing.images.map((image, idx) => (
                    <img
                      key={idx}
                      src={`http://localhost:5000${image}`} // Adjust base URL if needed
                      alt={`${listing.name} image ${idx + 1}`}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => (e.target.src = "/fallback-image.jpg")} // Optional fallback
                    />
                  ))}
                </div>
              )}
              {/* Name and Price */}
              <span className="font-semibold">
                {listing.name} - ${listing.price}
              </span>
            </div>
            {/* Buttons */}
            <div>
              <button
                onClick={() => {
                  setEditId(listing.id);
                  reset(listing);
                }}
                className="text-blue-500 mr-2 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(listing.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Lead Generation Module */}
      <h3 className="text-xl font-bold mt-8 mb-2">Lead Generation Module</h3>
      <select
        value={leadFilter}
        onChange={(e) => setLeadFilter(e.target.value)}
        className="border p-2 rounded mb-4"
      >
        <option value="all">All</option>
        <option value="new">New</option>
        <option value="claimed">Claimed</option>
      </select>

      <ul className="space-y-2">
        {filteredLeads.map((lead) => (
          <li
            key={lead.id}
            className="border p-2 rounded flex justify-between items-center"
          >
            <span>{lead.name} - {lead.status}</span>
            {lead.status === "new" && (
              <button
                onClick={() => handleClaimLead(lead.id)}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
              >
                Claim
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListingsPage;