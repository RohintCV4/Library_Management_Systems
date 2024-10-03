import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddborrowbookMutation, useGetBooksQuery, useGetPurchaseQuery } from '../redux/services/libApi';
import { useNavigate } from 'react-router-dom';

const Book = () => {
  const [state, setState] = useState({
    bookValue: [],
    selectedBooks: [],
    currentPage: 1,
    totalPages: 0,
    id: '',
    get: []
  });

  const { data: book, isLoading, error } = useGetBooksQuery();
  
  // Move this line down to ensure state.id is defined before usage
  const { data: purchase } = useGetPurchaseQuery(state.id); 

  const navigate = useNavigate();
  
  const [addBorrowBook] = useAddborrowbookMutation();

  // Calculate borrowed book IDs and allowed to take
  const bid = purchase?.data?.map(item => item.book.id) || []; 
  const allowedToTake = 3 - bid.length;

  // Decode user ID from token
  useEffect(() => {
    const token = sessionStorage.getItem("Token"); 
    if (token) {
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      setState(prevState => ({ ...prevState, id: payload.user_id }));
      console.log('User_id:', payload.user_id);
    }
  }, []);

  // Update book values and total pages when book data changes
  useEffect(() => {
    if (book && book.data) {
      setState(prevState => ({
        ...prevState,
        bookValue: book.data,
        totalPages: Math.ceil(book.data.length / 8)
      }));
    }
  }, [book]);

  const handleChange = (item) => {
    const isBookAlreadyTaken = state.get.some(book => book.id === item.id);
    
    if (isBookAlreadyTaken) {
      setState(prevState => ({
        ...prevState,
        get: prevState.get.filter(book => book.id !== item.id),
        selectedBooks: prevState.selectedBooks.filter(bookId => bookId !== item.id)
      }));
      toast.info("You have returned the book.", {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
      });
    } else {
      if (state.get.length >= allowedToTake) {
        toast.error(`You cannot take more than ${allowedToTake} books. You have selected ${state.get.length + 1} books.`, {
          position: "top-right",
          autoClose: 1500,
          theme: "colored",
        });
        return;
      }

      setState(prevState => ({
        ...prevState,
        get: [...prevState.get, { id: item.id, value: item }],
        selectedBooks: [...prevState.selectedBooks, item.id]
      }));

      if (state.get.length + 1 === allowedToTake) {
        toast.info(`You have taken ${allowedToTake} books.`, {
          position: "top-right",
          autoClose: 1500,
          theme: "colored",
        });
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <div>
      <ToastContainer />
      <div className="container">
        <h2 className="text-center my-4">Book Store</h2>
        <div className="row">
          {Array.isArray(state.bookValue) && state.bookValue.slice((state.currentPage - 1) * 8, state.currentPage * 8).map((item) => {
            if (item?.available !== 0) {
              const mimeType = item.imageFormat === 'png' ? 'image/png' :
                item.imageFormat === 'jpeg' || item.imageFormat === 'jpg' ? 'image/jpeg' :
                  item.imageFormat === 'gif' ? 'image/gif' :
                    item.imageFormat === 'svg' ? 'image/svg+xml' :
                      'application/octet-stream';

              const isTaken = state.get.some(book => book.id === item.id);

              return (
                <div className="col-md-6 col-lg-3 mb-4" key={item.id}>
                  <div className={`card h-100 shadow-sm p-2 ${isTaken ? 'bg-green-light text-dark' : 'bg-light'} border-0`}>
                    <img
                      src={`data:${mimeType};base64,${item.imageData}`}
                      className="card-img-top"
                      alt={item.name}
                      style={{ width: '100%', height: 'auto', maxHeight: '250px', objectFit: 'cover' }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">
                        <strong>Author:</strong> {item.authorName} <br />
                      </p>
                      
                      <div className="mt-auto d-flex justify-content-between align-items-center">
                        <button 
                          className="btn btn-primary ms-auto px-4" 
                          onClick={() => handleChange(item)}
                          disabled={bid.length >= 3 || bid.includes(item.id)}
                        >
                          {isTaken ? "Return" : "Get"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Submit Button */}
        <div className='row'>
          <span className='d-flex justify-content-end mt-4'>
            <button
              className='btn btn-success btn-lg'
              onClick={async () => {
                if (state.selectedBooks.length === 0) {
                  toast.error("You can't select any books, you already reached the maximum limit.", { autoClose: 2000 });
                  return;
                }

                try {
                  await addBorrowBook({ id: state.id, selectedBooks: state.selectedBooks });
                  toast.success("Books submitted successfully!", { autoClose: 1500 });
                  setTimeout(() => {
                    navigate(`/library/purchase/${state.id}`);
                  }, 2000);
                } catch (err) {
                  toast.error("Unable to submit books.", { autoClose: 2000 });
                }
              }}
              disabled={state.selectedBooks.length > allowedToTake}
            >
              Submit
            </button>
          </span>

          {/* Pagination */}
          <span className='d-flex justify-content-center mt-4'>
            {Array.from({ length: state.totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                className={`btn btn-outline-primary mx-1 my-3 ${state.currentPage === page ? 'active' : ''}`}
                onClick={() => setState(prevState => ({ ...prevState, currentPage: page }))}
              >
                {page}
              </button>
            ))}
          </span>
        </div>
      </div>

      {/* Additional Styles */}
      <style>{`
        .card:hover {
          transform: scale(1.05);
          transition: transform 0.2s;
        }
        .bg-green-light {
          background-color: #b6decb; 
        }
      `}</style>
    </div>
  );
};

export default Book;