import Modal from "./Modal";
import AddLocationCard from "./AddLocationCard";
import "./AddLocationCard.css";

export default function AddLocationModal({ props }) {
  const { isModalOpen, setIsModalOpen } = props;

  return (
    <>
      <Modal
        props={
          <>
            <AddLocationCard props={{ setIsModalOpen }} />
          </>
        }
        isOpen={isModalOpen}
      />
    </>
  );
}
