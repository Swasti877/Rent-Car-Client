import Modal from "./Modal";
import AddRentalCard from './AddRentalCard.js';

export default function AddRentalModal({ props }) {
  const { isModalOpen, setIsModalOpen } = props;
  return (
    <>
      <Modal
        props={
          <>
            <AddRentalCard props={{ setIsModalOpen }} />
          </>
        }
        isOpen={isModalOpen}
      />
    </>
  );
}
