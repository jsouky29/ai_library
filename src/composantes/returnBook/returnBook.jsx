import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import './returnBook.css';

function ReturnBook() {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [montrerSuccess, setMontrerSuccess] = useState(false);
    const [montrerError, setMontrerError] = useState(false);
    const loggedEmail = localStorage.getItem('userEmail') || '';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBorrowedBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:3010/auth/borrowedBooks?email=${loggedEmail}`);
                setBorrowedBooks(response.data);
            } catch (error) {
                console.error("Error fetching borrowed books", error);
            }
        };

        fetchBorrowedBooks();
    }, [loggedEmail]);

    const handleReturn = async (bookId, empruntId) => {
        try {
            const response = await axios.post(`http://localhost:3010/auth/return/${bookId}?email=${loggedEmail}&empruntId=${empruntId}`);
            if (response.status === 200) {
                setMontrerSuccess(true);
                setMontrerError(false);
                const updatedResponse = await axios.get(`http://localhost:3010/auth/borrowedBooks?email=${loggedEmail}`);
                setBorrowedBooks(updatedResponse.data);
                setTimeout(() => setMontrerSuccess(false), 5000);
            }
        } catch (error) {
            setMontrerSuccess(false);
            setMontrerError(true);
            setTimeout(() => setMontrerError(false), 5000);
            console.error("Error returning book", error);
        }
    };
    const timeElapsed = (borrowDate) => {
        const now = new Date();
        const borrowedDate = new Date(borrowDate);
        const diffInMs = now - borrowedDate;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const diffInHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

        if (diffInDays > 0) return `${diffInDays} jours `;
        if (diffInHours > 0) return `${diffInHours} heures`;
        if (diffInMinutes > 0) return `${diffInMinutes} minutes`;
        return 'Maintenant';
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#5dc1b6] to-[#1E232F] text-white">
            {montrerError && (
                <div className="w-full alert alert-danger">
                    <strong>Erreur!</strong> Vous ne pouvez pas retourner ce livre.
                </div>
            )}
            {montrerSuccess && (
                <div className="w-full alert alert-success">
                    <strong>Success!</strong> Le livre a ete retourner avec succes.
                </div>
            )}
            <br />
            <br />

            <h2 id='text'>Voici les livres que vous avez emprunter</h2>
            <br />
            {borrowedBooks.length === 0 ? (<>
                <br />
                <p id='text'>Vous n'avez rien emprunter</p>

                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </>
            ) : (
                <div className="grid w-full max-w-7xl px-4">
                    {borrowedBooks.map((book, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card id="books" style={{ width: '18rem' }} key={index}>
                                <Card.Img variant="top" src={book.image} />
                                <Card.Body>
                                    <Card.Title>{book.titre}</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item><b>Temps écoulé depuis l'emprunt: </b>{timeElapsed(book.dateEmprunt)}</ListGroup.Item>

                                </ListGroup>
                                <Card.Body>
                                    <Card.Link className="btn btn-outline-primary" href="#" onClick={() => handleReturn(book.bookId, book._id)}>Retourner le livre</Card.Link>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}
            <br />
            <br />
            <br />
            <br />
            <br />

            <footer className="w-full py-8 bg-[#28201e] text-center text-sm text-white">
                <p>&copy; 2024 AI Library Platform. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default ReturnBook;
