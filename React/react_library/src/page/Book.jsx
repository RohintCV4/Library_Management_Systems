import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddborrowbookMutation, useGetBooksQuery, useGetPurchaseQuery } from '../redux/services/libApi';
import { useNavigate, useParams } from 'react-router-dom';
import '../asset/css/Book.css';
import { Box, Button, Rating, Typography } from '@mui/material';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Stack } from 'react-bootstrap';

const Book = () => {
  const { id } = useParams();
  const [state, setState] = useState({
    bookValue: [],
    selectedBooks: [],
    currentPage: 1,
    totalPages: 0,
    get: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const modalRef = useRef();
  const handleSearchChange = (event) => {

    setSearchTerm(event.target.value);

  };
  const filteredBooks = state.bookValue.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // console.log(state?.bookValue);
  


  const { data: book, isLoading, error, refetch } = useGetBooksQuery();
  const { data: purchase } = useGetPurchaseQuery(id);
  const navigate = useNavigate();

  const [addBorrowBook] = useAddborrowbookMutation();


  useEffect(() => {
    refetch();
  }, [id, refetch]);

  const bid = purchase?.data?.map(item => item.book.id) || [];
  const allowedToTake = 3 - bid.length;

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
// console.log(state?.selectedBooks);


      if (state.get.length + 1 === allowedToTake) {
        toast.info(`You taken maximum books.`, {
          position: "top-right",
          autoClose: 1500,
        });
      }
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <div>
      <ToastContainer />
      <div className='bod'>
        <div className="container bod">
          <div className='row align-items-center'>
            <div className='col-md-9 text-center ps-md-5'>
              <h2 className="md-4 py-3 ps-md-5">Book Store</h2>
            </div>
            <div className="col-12 col-md-3 d-flex justify-content-center">
              <div
                className="bg-white rounded-3 d-flex align-items-center p-1 mb-3 mb-md-0 w-100"
                style={{ height: "35px" }}
              >
                <Icon
                  icon="ion:search-sharp"
                  width="24"
                  height="24"
                  className="mx-2"
                />
                <input
                  type="text"
                  className="border-0 flex-grow-1 w-100"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{
                    height: "100%",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="row">
            {filteredBooks.slice((state.currentPage - 1) * 8, state.currentPage * 8).map((item) => {
              if (item?.available !== 0) {
                const mimeType = item.imageFormat === 'png' ? 'image/png' :
                  item.imageFormat === 'jpeg' || item.imageFormat === 'jpg' ? 'image/jpeg' :
                    item.imageFormat === 'gif' ? 'image/gif' :
                      item.imageFormat === 'svg' ? 'image/svg+xml' :
                        'application/octet-stream';

                const isTaken = state.get.some(book => book.id === item.id);

                return (
                  <div className="col-md-6 col-lg-3 mb-4" key={item.id}>
                    <div className={`card cards h-100 shadow-sm p-2 ${isTaken ? 'bg-green-light text-dark' : 'bg-light'} border-0`}
                      onClick={() => {
                        setSelectedBook(item.name);
                        setModalData({
                          authorName: item.authorName,
                          available: item.available,
                          categoryName: item.category?.name,
                          publisher: item.publisher,
                          rating: item.rating
                        });
                        setModalVisible(true);
                      }}>
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

                        <div className="mt-auto d-flex">
                          <Stack spacing={1}>
                            <Rating name="half-rating-read" disabled value={item.rating} />
                          </Stack>
                          <Button
                            className="btn text-white ms-auto px-3 gcolor"
                            onClick={(e) => {
                              e.stopPropagation(); 
                              handleChange(item);
                            }}
                            disabled={bid.length >= 3 || bid.includes(item.id)}
                          >
                            <Typography textTransform={'capitalize'}> {isTaken ? "Return" : "Get"}</Typography>

                            
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Modal */}
                    {modalVisible && (
                      <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!modalVisible}>
                        <div className="modal-dialog modal-dialog">
                          <div className="modal-content border-0">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="exampleModalLabel" ref={modalRef}>{selectedBook}</h1>
                              <button type="button" className="btn-close" onClick={() => setModalVisible(false)} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                             
                              <p><strong>Author:</strong> {modalData.authorName}</p>
                              <p><strong>Available:</strong> {modalData.available}</p>
                              <p><strong>Category:</strong> {modalData.categoryName}</p>
                              <p><strong>Publisher:</strong> {modalData.publisher}</p>
                              <p><strong>Ratings:</strong> {modalData.rating}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>

          <div className='row'>
            <span className='d-flex justify-content-end mt-4'>
              <Button
                variant="contained" color="success"
                onClick={async () => {
                  if (state.selectedBooks.length === 0) {
                    toast.error("You can't select any books; you already reached the maximum limit.", { autoClose: 2000 });
                    return;
                  }

                  try {
                    await addBorrowBook({ id: id, selectedBooks: state.selectedBooks });
                    toast.success("Books submitted successfully!", { autoClose: 1500 });
                    setTimeout(() => {
                      navigate(`/library/purchase/${id}`);
                    }, 2000);
                  } catch (err) {
                    toast.error("Unable to submit books.", { autoClose: 2000 });
                  }
                }}
                disabled={state.selectedBooks.length > allowedToTake}
              >
                Submit
              </Button>
            </span>


            <span className='d-flex justify-content-center mt-4'>
              {Array.from({ length: state.totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  className={`btn bts border-0 mx-1 my-3 ${state.currentPage === page ? 'gcolor actives' : ''}`}
                  onClick={() => setState(prevState => ({ ...prevState, currentPage: page }))}
                >
                  {page}
                </button>
              ))}
            </span>
          </div>
        </div>

      </div>

      <style>
        {`
      @media (min-width: 768px) {
    .ps-md-5 {
        padding-left: 6rem !important; /* For screens 768px and wider */
    }
}

@media (min-width: 1024px) {
    .ps-md-5 {
        padding-left: 9rem !important; /* For screens 1024px and wider */
    }
}
          .bts {
            background-color: transparent; /* Default plain style */
            color: black; /* Adjust text color as needed */
            border: 1px solid #ccc; /* Add a border for better visibility */
            padding: 10px 20px; /* Add some padding */
            border-radius: 5px; /* Optional: rounded corners */
            cursor: pointer; /* Change cursor on hover */
            transition: background-color 0.3s ease, color 0.3s ease; /* Smooth transition for hover effects */
          }

          .bts:hover {
            background-color: rgb(101, 164, 143); /* Your gcolor */
            color: white;
          }

          .actives {
            background-color: rgb(101, 164, 143); /* Your gcolor */
            color: white;
          }
        `}
      </style>

    </div>

  );
};

export default Book;