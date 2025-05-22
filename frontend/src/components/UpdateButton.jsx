const UpdateButton = ({ onEdit }) => {
  return (
    <button onClick={onEdit} className="bg-blue-500 text-white border border-black w-[70px] h-[25px] text-sm hover:bg-blue-700">
      EDITAR
    </button>
  );
};

export default UpdateButton;