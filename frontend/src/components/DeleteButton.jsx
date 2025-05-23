function DeleteButton({ onDelete, id, className = "" }) {
  const handleClick = () => {
    if (window.confirm("Tem certeza que deseja deletar?")) {
      onDelete(id);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-[#FF0000] text-white border border-black w-[70px] h-[25px] text-sm hover:bg-[#a81919] ${className}`}
    >
      EXCLUIR
    </button>
  );
}

export default DeleteButton;
