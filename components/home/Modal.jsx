import Link from 'next/link';
import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#app-modal');

const HomeModal = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(true);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
        <h2 className="text-lg font-semibold uppercase">We Are Open!</h2>
        <p className="mt-2">
          After today we shall return to our normal{' '}
          <Link href="/contact">
            <a className="text-ssblue">Opening Hours.</a>
          </Link>
        </p>
        <button onClick={closeModal} className="bg-ssblue text-white mt-4 rounded p-2">
          Close
        </button>
      </Modal>
    </div>
  );
};

export default HomeModal;
