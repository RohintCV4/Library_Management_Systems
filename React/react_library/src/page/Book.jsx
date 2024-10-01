import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddborrowbookMutation, useGetBooksQuery } from '../redux/services/libApi';
import { useNavigate } from 'react-router-dom';

const Book = () => {
  const { data: book, isLoading, error } = useGetBooksQuery();
  const [bookValue, setBookValue] = useState([]);
  const [id, setId] = useState('');
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  
  const [get, setGet] = useState([]);
  
  const navigate = useNavigate();
  
  // Add borrow book mutation
  const [addBorrowBook] = useAddborrowbookMutation();

  useEffect(() => {
    const token = sessionStorage.getItem("Token"); 
    if (token) {
        const tokenParts = token.split('.');
        if (tokenParts.length === 3) {
            const payloadBase64 = tokenParts[1];
            const decodedPayload = atob(payloadBase64);
            const payload = JSON.parse(decodedPayload);
            setId(payload.user_id);
            console.log('User_id:', payload.user_id);
        }
    }
}, []);

  useEffect(() => {
    if (book && book.data) {
      setBookValue(book.data);
      setTotalPages(Math.ceil(book.data.length / 8));
    }
  }, [book]);

  const handleChange = (item) => {
    const isBookAlreadyTaken = get.some(book => book.id === item.id);

    if (isBookAlreadyTaken) {
      // Return the book
      setGet(get.filter(book => book.id !== item.id));
      setSelectedBooks(selectedBooks.filter(bookId => bookId !== item.id));
      toast.info("You have returned the book.", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    } else {
      // Check if max limit is reached
      if (get.length >= 3) {
        toast.error("You can't take more than 3 books until you return the books.", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        });
        return;
      }

      // Take the book
      const updatedGet = [...get, { id: item.id, value: item }];
      setGet(updatedGet);
      setSelectedBooks([...selectedBooks, item.id]); // Correctly add ID to selected books

      if (updatedGet.length === 3) {
        toast.info("You have taken 3 books.", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        });
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  console.log(selectedBooks);

  return (
    <div>
      <ToastContainer />
      <div className="container">
        <h2 className="text-center my-4">Book Store</h2>
        <div className="row">
          {Array.isArray(bookValue) && bookValue.slice((currentPage - 1) * 8, currentPage * 8).map((item) => {
            if (item?.available !== 0) {
              const mimeType = item.imageFormat === 'png' ? 'image/png' :
                item.imageFormat === 'jpeg' || item.imageFormat === 'jpg' ? 'image/jpeg' :
                  item.imageFormat === 'gif' ? 'image/gif' :
                    item.imageFormat === 'svg' ? 'image/svg+xml' :
                      'application/octet-stream';

              const isTaken = get.some(book => book.id === item.id);

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
                        <button className="btn btn-primary ms-auto px-4" onClick={() => handleChange(item)}>
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
                try {
                  await addBorrowBook({ id, selectedBooks }); // Call mutation with id and selectedBooks
                  toast.success("Books submitted successfully!", { autoClose: 1500 });
                  setTimeout(() => {
                    navigate(`/library/purchase/${id}`);
                  }, 2000);
                } catch (err) {
                  toast.error("Unable to submit books.", { autoClose: 2000 });
                }
              }}
            >
              Submit
            </button>
          </span>

          {/* Pagination */}
          <span className='d-flex justify-content-center mt-4'>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                className={`btn btn-outline-primary mx-1 my-3 ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
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