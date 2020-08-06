import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Index = function ({user}) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        (async () => {
            await getBooks();
        })();
    }, []);

    const getBooks = async () => {
        const booksResp = await Axios.get('/api/books');
        if(booksResp.status=== 200) setBooks(booksResp.data);
    };

    const deleteBook = async book => {
        try {
          const resp = await Axios.post('/api/books/delete', {
            id: book._id
          });
    
          if (resp.status === 200) toast("The book was deleted successfully", {type: toast.TYPE.SUCCESS});
    
          await getBooks();
        } catch (error) {
          toast("There was an error deleting the book", {type: toast.TYPE.ERROR});
        }
      };    

      return (
        <Container className="my-5">
          <header>
            <h1>Archive</h1>
          </header>
          <hr/>
    
          <div className="content">
            {books && books.map((book, i) => (
              <div key={i} className="card my-3">
                <div className="card-header clearfix">
                  <div className="float-left">
                    <h5 className="card-title">
                      {book.title}
                    </h5>
    
                    {book.user ? (
                      <small>~{book.user.fullname}</small>
                    ) : null}
                  </div>
                      
                  <div className="float-right">
                    <small>{book.updatedAt}</small>
                  </div>
                </div>
    
                <div className="card-body">
                  <p className="card-text">
                    {book.synopsis}
                  </p>
                </div>
    
                {user ? (
                  <div className="card-footer">

                    <Link to={{
                      pathname: "/books/edit",
                      state: {
                        id: book._id
                      }
                    }}>
                      <i className="fa fa-edit"></i>
                    </Link>
    
                    <button type="button" onClick={() => deleteBook(book)}>
                      <i className="fa fa-trash"></i>

                    </button>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          
        </Container>
      );    
};

export default Index; 