import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddReturnBookMutation, useGetPurchaseQuery } from '../../redux/services/libApi';
import { Button, createTheme, ThemeProvider, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ReturnBook = () => {
  const { id } = useParams();
  const { data: purchase } = useGetPurchaseQuery(id);
  const[returnData]=useAddReturnBookMutation();
  const navigate=useNavigate();
  const handleReturn = (bookId) => {
    console.log(`Returning book with ID: ${bookId}`);
    returnData(bookId)
    // navigate(`library/return/${id}`);
  };
  if(purchase?.data?.length===0){
    return("No data found");
  }
  const theme = createTheme({
    palette: {
      ochre: {
        main: '#E3D026',
        light: '#E9DB5D',
        dark: '#A29415',
        contrastText: '#242105',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <div className="container mt-5">
      <div className="card border-0 shadow-sm ">
        <div className="card-header  text-center bg-light">
          <h3 className="mb-0">Return Books</h3>
        </div>
        <div className="card-body p-4 bg-light rounded-4">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>S.No</th>
                  <th>Book Name</th>
                  <th>Author Name</th>
                  <th>Publisher</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {purchase?.data?.slice(0,3)?.map((val, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{val?.book?.name}</td>
                    <td>{val?.book?.authorName}</td>
                    <td>{val?.book?.publisher}</td>
                   <td>{val?.book?.category?.name}</td> 
                   {console.log(val.id)}
                    <td>
                      <Button
                        variant="contained" color="ochre" endIcon={<SendIcon />}
                        onClick={() => handleReturn(val?.id)}
                        // onClick={() => navigate(`library/return/${val?.id}`)} 
                      >
                     <Typography textTransform={'capitalize'}> Return</Typography>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
};

export default ReturnBook;
