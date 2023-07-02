import React from 'react';

const DeleteModal = ({ setModal }) => {
  return (
    <div className='text-center'>
      {/* <!-- The button to open modal --> */}
      {/* <label for="deleteModal" class="btn modal-button">open modal</label> */}

      {/* <!-- Put this part before </body> tag-- > */}
      <input type="checkbox" id="deleteModal" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative">
          {/* <label for="deleteModal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label> */}
          <h3 class="text-lg font-bold my-10">Are You Sure You Want To Delete This?</h3>
          <label for="deleteModal" onClick={() => setModal(true)} className='btn mx-5 btn-error'>Yes</label>
          <label for="deleteModal" class="btn btn-success mx-5">No</label>
        </div>
      </div>
    </div >
  );
};

export default DeleteModal;