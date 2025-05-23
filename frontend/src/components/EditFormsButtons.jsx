import React from "react";

function EditFormsButtons({ sensorId, onSave, onCancel }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onSave(sensorId)}
        className="bg-green-500 text-white border border-black w-[70px] h-[25px] text-sm hover:bg-green-700"
      >
        SALVAR
      </button>
      <button
        onClick={onCancel}
        className="bg-blue-500 text-white border border-black w-[70px] h-[25px] text-sm hover:bg-gray-700"
      >
        CANCELAR
      </button>
    </div>
  );
}

export default EditFormsButtons;
