const UpdateButton = ({ onEdit }) => {
  return (
    <button onClick={onEdit} className="bg-charcoal text-white px-[15px] py-[5px] rounded-[5px] font-semibold hover:bg-charcoalHover">
      EDITAR
    </button>
  );
};

export default UpdateButton;