import React from "react";

function EditFormsButtons({ sensorId, onSave, onCancel }) {
  return (
    <section className="flex gap-2">
      <button
        onClick={() => onSave(sensorId)}
        className="bg-blue-600 text-white px-[15px] py-[5px] rounded-[5px] font-semibold hover:bg-blue-700">
        SALVAR
      </button>
      <button
        onClick={onCancel}
        className="bg-[#ee2525]  text-white px-[15px] py-[5px] rounded-[5px] font-semibold hover:bg-[#b60000]">
        CANCELAR
      </button>
    </section>
  );
}

export default EditFormsButtons;
