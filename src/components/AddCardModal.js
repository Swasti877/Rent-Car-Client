import Modal from "./Modal.js";
import AddCarCard from "./AddCarCard";

export default function AddCardModal({ props }) {
  const { isModalOpen, setIsModalOpen } = props;

  return (
    <>
      <Modal
        props={
          <>
            <AddCarCard props={{ setIsModalOpen }} />
          </>
        }
        isOpen={isModalOpen}
      />
    </>
  );
}
