import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function ReEntryForm() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    contact: "",
    location: "",
    educationLevel: "",
    gapYears: "",
    digitalAccess: "",
    careerArea: "",
    skillLevel: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const user = auth.currentUser;
      await addDoc(collection(db, "reentry-forms"), {
        ...form,
        userId: user?.uid || "anonymous",
        email: user?.email || "",
        submittedAt: new Date().toISOString(),
      });
      setSaved(true);
      alert("Information saved successfully! ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to save. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = () => {
    navigate("/assessment", { state: { careerArea: form.careerArea } });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#c9b8f0] min-h-screen px-10 py-8 relative">

        <h2 className="text-lg font-bold text-purple-900 mb-4">Personal information</h2>
        <div className="grid grid-cols-2 gap-4 mb-6 max-w-2xl">
          <input type="text" placeholder="Full Name" value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="px-4 py-3 rounded-lg bg-[#d4a99a] placeholder-white text-white font-semibold focus:outline-none" />
          <input type="text" placeholder="Address" value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="px-4 py-3 rounded-lg bg-[#d4a99a] placeholder-white text-white font-semibold focus:outline-none" />
          <input type="text" placeholder="Contact Number" value={form.contact}
            onChange={(e) => handleChange("contact", e.target.value)}
            className="px-4 py-3 rounded-lg bg-[#d4a99a] placeholder-white text-white font-semibold focus:outline-none" />
          <input type="text" placeholder="Live location (city, state)" value={form.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="px-4 py-3 rounded-lg bg-[#d4a99a] placeholder-white text-white font-semibold focus:outline-none" />
        </div>

        <div className="bg-[#d9d4e8] rounded-2xl p-6 max-w-2xl mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Educational gaps</h3>
          <div className="bg-white rounded-xl px-4 py-3 mb-3">
            <p className="text-sm font-semibold text-gray-700 mb-2">Education level</p>
            <div className="flex gap-6">
              {["Below 10th", "12th Completed", "Under-graduate incomplete"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                  <input type="radio" name="educationLevel" value={opt}
                    checked={form.educationLevel === opt}
                    onChange={() => handleChange("educationLevel", opt)}
                    className="accent-purple-500 w-4 h-4" />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl px-4 py-3 mb-3">
            <p className="text-sm font-semibold text-gray-700 mb-2">Gap years</p>
            <div className="flex gap-6">
              {["1-3 years", "4-7 years", "8+ years"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                  <input type="radio" name="gapYears" value={opt}
                    checked={form.gapYears === opt}
                    onChange={() => handleChange("gapYears", opt)}
                    className="accent-purple-500 w-4 h-4" />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl px-4 py-3">
            <p className="text-sm font-semibold text-gray-700 mb-2">Digital access</p>
            <div className="flex gap-6">
              {["Yes", "No"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                  <input type="radio" name="digitalAccess" value={opt}
                    checked={form.digitalAccess === opt}
                    onChange={() => handleChange("digitalAccess", opt)}
                    className="accent-purple-500 w-4 h-4" />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#d9d4e8] rounded-2xl p-6 max-w-2xl mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Career growth Interests</h3>
          <div className="bg-white rounded-xl px-4 py-3 mb-3">
            <p className="text-sm font-semibold text-gray-700 mb-2">Interested career area</p>
            <div className="flex gap-6">
              {["Technology", "Healthcare", "Business"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                  <input type="radio" name="careerArea" value={opt}
                    checked={form.careerArea === opt}
                    onChange={() => handleChange("careerArea", opt)}
                    className="accent-purple-500 w-4 h-4" />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl px-4 py-3">
            <p className="text-sm font-semibold text-gray-700 mb-2">Skill level</p>
            <div className="flex gap-6">
              {["Beginner", "Intermediate", "Advance"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                  <input type="radio" name="skillLevel" value={opt}
                    checked={form.skillLevel === opt}
                    onChange={() => handleChange("skillLevel", opt)}
                    className="accent-purple-500 w-4 h-4" />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BUTTONS */}
        <div className="max-w-2xl flex justify-between items-center mt-6 mb-16">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#7e57c2] hover:bg-[#6a3fbf] text-white px-10 py-3 rounded-full font-semibold text-sm transition shadow-md disabled:opacity-50"
          >
            {saving ? "Saving..." : saved ? "Saved ✅" : "Save info"}
          </button>
        </div>

        {/* Fixed Bottom Right */}
        <div className="fixed bottom-8 right-8">
          <button
            onClick={handleSubmit}
            className="bg-[#e8705a] hover:bg-[#d45f49] text-white px-8 py-5 rounded-2xl font-bold text-base shadow-lg transition"
          >
            Click here,<br />to take assessment
          </button>
        </div>

      </div>
    </div>
  );
}
