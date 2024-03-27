// //react
// import React, { useEffect, useRef, useState } from 'react'

// //rrd
// import { useFetcher, useParams } from 'react-router-dom'

// //library imports
// import { CurrencyDollarIcon } from '@heroicons/react/24/outline'


// const AddTransactionForm = () => {
//     const fetcher = useFetcher()
//     const formRef = useRef()
//     const focusRef = useRef()
//     const [selected, setSelected] = useState("CreditCard")
//     const isSubmitting = fetcher.state === "submitting"
    
//     useEffect(() => {
//       if(!isSubmitting) {
//         formRef.current.reset()
//         focusRef.current.focus()
//         setSelected("CreditCard")
//       }
//     }, [isSubmitting])
//     let {id} = useParams()
//     const shiftId = id
//     console.log("shiftId: ", shiftId)
//     return (
      
//       <div className='form-wrapper'>
//       <h2>Add Check</h2>
//       <fetcher.Form 
//         method="post"
//         className='grid-small' 
//         ref={formRef}>
//             <div className="expense-inputs">
//                 <div className="grid-xs">
//                     <label htmlFor="newCheckTotal">Amount:</label>
//                     <input 
//                         type="number"
//                         step='0.01'
//                         inputMode='decimal'
//                         name='newCheckTotal'
//                         id='newCheckTotal'
//                         placeholder='Enter amount'
//                         ref={focusRef}
//                         required />
//                 </div>
//                 <div className="grid-xs">
//                     <label htmlFor="newCheckTips">TIPS:</label>
//                     <input 
//                         type="number"
//                         step='0.01'
//                         inputMode='decimal'
//                         name='newCheckTips'
//                         id='newCheckTips'
//                         placeholder='Enter amount'
//                         required />
//                 </div>
//                 <div className="grid-xs">
//                 <label 
//                 htmlFor="newPaymentType" 
//                 >Payment Type:</label>
//           <select
//             value={selected}
//             name='newPaymentType'
//             id='newPaymentType'
//             required
//             onChange={e => setSelected(e.target.value)}>
//                 <option ref={focusRef} key="CreditCard" value="CreditCard">Credit Card</option>
//                 <option key="Cash" value="Cash">Cash</option>
//                 <option key="GiftCard" value="GiftCard">Gift Card</option>
//           </select>
//           <input type="hidden" name='_action' value="createTransaction" />
//           <input type="hidden" name='shiftId' id='shiftId' value={shiftId} />
//           <button type='submit' className='btn btn--dark' disabled={isSubmitting}>
//             {(isSubmitting) ? (
//               <p>Processing...</p>
//             ) : (
//               <>
//                 <span>Add Check</span>
//                 <CurrencyDollarIcon width={20} />
//               </>
//             )}
//           </button>

//                 </div>
//             </div>
//       </fetcher.Form>
//     </div>
//   )
// }

// export default AddTransactionForm



import React, { useEffect, useRef, useState } from 'react';
import { useFetcher, useParams } from 'react-router-dom';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { Camera } from 'react-camera-pro';
import Tesseract from 'tesseract.js'; // Import Tesseract for OCR

const AddTransactionForm = () => {
  const fetcher = useFetcher();
  const formRef = useRef();
  const focusRef = useRef();
  const [selected, setSelected] = useState('CreditCard');
  const isSubmitting = fetcher.state === 'submitting';
  const [receiptImage, setReceiptImage] = useState(null);

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
      setSelected('CreditCard');
      setReceiptImage(null); // Clear the receipt image after submission
    }
  }, [isSubmitting]);

  let { id } = useParams();
  const shiftId = id;
  console.log('shiftId: ', shiftId);

  // Function to handle capturing image from the camera
  const captureImage = () => {
    const camera = document.getElementById('camera');
    camera.capture()
      .then(blob => {
        // Set the captured image
        setReceiptImage(blob);
        // Perform OCR on the captured image
        Tesseract.recognize(
          blob,
          'eng',
          { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
          // Extract information from OCR result and fill form fields
          const regex = /(?:Total|Amount):\s*\$?(\d+(\.\d{2})?)/i;
          const matches = regex.exec(text);
          if (matches && matches.length > 1) {
            const totalAmount = matches[1];
            document.getElementById('newCheckTotal').value = totalAmount;
            // You can extract tips similarly if it's in the receipt
          }
        });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className='form-wrapper'>
      <h2>Add Check</h2>
      <div className="camera-wrapper">
        <Camera
          id="camera"
          ref={(cam) => (this.camera = cam)}
          style={{ width: '100%', height: 'auto' }}
        />
        <button onClick={captureImage}>Capture Image</button>
      </div>
      <form
        method="post"
        className='grid-small'
        ref={formRef}
      >
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newCheckTotal">Amount:</label>
            <input
              type="number"
              step='0.01'
              inputMode='decimal'
              name='newCheckTotal'
              id='newCheckTotal'
              placeholder='Enter amount'
              ref={focusRef}
              required />
          </div>
          {/* Other form fields */}
          <div className="grid-xs">
            <button type='submit' className='btn btn--dark' disabled={isSubmitting}>
              {isSubmitting ? (
                <p>Processing...</p>
              ) : (
                <>
                  <span>Add Check</span>
                  <CurrencyDollarIcon width={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTransactionForm;
