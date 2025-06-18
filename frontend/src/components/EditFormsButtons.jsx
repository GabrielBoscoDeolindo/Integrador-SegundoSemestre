import React from "react";

function EditFormsButtons({ sensorId, onSave, onCancel }) {
  return (
    <section className="flex gap-2">
      <button
        onClick={() => onSave(sensorId)}
        className="bg-blue-600 text-white px-[15px] py-[5px] rounded-[5px] font-semibold hover:bg-blue-700 cursor-pointer">
        SALVAR
      </button>
      <button
        onClick={onCancel}
        className="bg-[#ce2424] text-white px-[15px] py-[5px] rounded-[5px] font-semibold hover:bg-[#b60000] cursor-pointer">
        CANCELAR
      </button>
    </section>
  );
}

export default EditFormsButtons;
