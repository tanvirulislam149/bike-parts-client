import React from 'react';
import { MdDeleteForever } from "react-icons/md";

const DeleteModal = ({ setModal }) => {
  return (
    <div className='text-center'>
      {/* <!-- The button to open modal --> */}
      {/* <label for="deleteModal" class="btn modal-button">open modal</label> */}

      {/* <!-- Put this part before </body> tag-- > */}
      <input type="checkbox" id="deleteModal" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box rounded-none p-7 relative">
          {/* <label for="deleteModal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label> */}
          <div className='flex justify-center '>
            <MdDeleteForever className='w-12 h-12 border-red-500 text-red-500 border-2 p-2' style={{ borderRadius: "50%" }} />
          </div>
          <h3 class="text-lg font-bold mt-2 mb-5">Are You Sure You Want To Delete This?</h3>
          <div className='text-right'>
            <label for="deleteModal" class="btn rounded-none bg-white text-black hover:text-white mx-5">Cancel</label>
            <label for="deleteModal" onClick={() => setModal(true)} className='btn rounded-none mx-0 btn-error'>Delete</label>
          </div>
        </div>
      </div>
    </div >
  );
};

export default DeleteModal;