function DeleteButton({ onDelete, id, className = "" }) {
  const handleClick = () => {
    if (window.confirm("Tem certeza que deseja deletar?")) {
      onDelete(id);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-[#e02a2a] text-white px-[15px] py-[5px] rounded-[5px] font-semibold hover:bg-[#b60000] cursor-pointer">
      EXCLUIR
    </button>
  );
}

export default DeleteButton;
