import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const predefinedCharges = [
  {
    _id: "1",
    name: "Service Fee",
    type: "percentage",
    value: 5,
    isApplicable: true,
  },
  {
    _id: "2",
    name: "Packaging Fee",
    type: "flat",
    value: 10,
    isApplicable: true,
  },
  {
    _id: "3",
    name: "Delivery Fee",
    type: "flat",
    value: 20,
    isApplicable: false,
  },
];

function ChargesManager() {
  const [charges, setCharges] = useState(predefinedCharges);
  const [newCharge, setNewCharge] = useState({
    name: "",
    type: "flat",
    value: 0,
  });
  const [editingCharge_Id, setEditingCharge_Id] = useState(null);
  const [error, setError] = useState(null);

  const handleAddCharge = () => {
    if (!newCharge.name || newCharge.value === 0) {
      setError("Please fill in all fields");
      return;
    }
    const _id = Date.now().toString();
    setCharges([...charges, { ...newCharge, _id, isApplicable: true }]);
    setNewCharge({ name: "", type: "flat", value: 0 });
    setEditingCharge_Id(null);
    setError(null);
  };

  const handleEditCharge = (_id) => {
    const chargeToEdit = charges.find((charge) => charge._id === _id);
    if (chargeToEdit) {
      setNewCharge({
        name: chargeToEdit.name,
        type: chargeToEdit.type,
        value: chargeToEdit.value,
      });
      setEditingCharge_Id(_id);
    }
  };

  const handleUpdateCharge = () => {
    if (editingCharge_Id) {
      setCharges(
        charges.map((charge) =>
          charge._id === editingCharge_Id ? { ...charge, ...newCharge } : charge
        )
      );
      setEditingCharge_Id(null);
      setNewCharge({ name: "", type: "flat", value: 0 });
    }
  };

  const handleDeleteCharge = (_id) => {
    setCharges(charges.filter((charge) => charge._id !== _id));
  };

  const handleToggleCharge = (_id) => {
    setCharges(
      charges.map((charge) =>
        charge._id === _id
          ? { ...charge, isApplicable: !charge.isApplicable }
          : charge
      )
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4">
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingCharge_Id ? "Edit Charge" : "Add New Charge"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block mb-2 font-medium">Charge Name</label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newCharge.name}
                onChange={(e) =>
                  setNewCharge({ ...newCharge, name: e.target.value })
                }
                placeholder="Enter charge name"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Charge Type</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md cursor-pointer"
                value={newCharge.type}
                onChange={(e) =>
                  setNewCharge({ ...newCharge, type: e.target.value })
                }
              >
                <option value="flat">Flat</option>
                <option value="percentage">Percentage</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium">Charge Value</label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                type="number"
                value={newCharge.value}
                onChange={(e) =>
                  setNewCharge({
                    ...newCharge,
                    value: parseFloat(e.target.value),
                  })
                }
                placeholder="Enter charge value"
                required
              />
            </div>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={editingCharge_Id ? handleUpdateCharge : handleAddCharge}
          >
            {editingCharge_Id ? "Update Charge" : "Add Charge"}
          </button>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left font-medium">Name</th>
              <th className="px-4 py-2 text-left font-medium">Type</th>
              <th className="px-4 py-2 text-left font-medium">Value</th>
              <th className="px-4 py-2 text-left font-medium">Status</th>
              <th className="px-4 py-2 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {charges.map((charge) => (
              <tr key={charge._id} className="border-t border-gray-200">
                <td className="px-4 py-2">{charge.name}</td>
                <td className="px-4 py-2">{charge.type}</td>
                <td className="px-4 py-2">
                  {charge.type === "percentage"
                    ? `${charge.value}%`
                    : `₹${charge.value}`}
                </td>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={charge.isApplicable}
                    onChange={() => handleToggleCharge(charge._id)}
                    className="h-4 w-4 cursor-pointer"
                  />
                </td>
                <td className="px-4 py-2">
                  <button
                    className="p-1 text-gray-600 hover:text-gray-900 mr-2"
                    onClick={() => handleEditCharge(charge._id)}
                  >
                    <FiEdit className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    className="p-1 text-gray-600 hover:text-gray-900"
                    onClick={() => handleDeleteCharge(charge._id)}
                  >
                    <FiTrash2 className="w-4 h-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ChargesManager;
