import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './historique.css';

function Historique() {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const loggedEmail = localStorage.getItem('userEmail') || '';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBorrowedBooks = async () => {
            try {
                const response = await axios.get(`http://localhost:3010/auth/history?email=${loggedEmail}`);
                const books = response.data;

                const groupedBooks = books.reduce((acc, book) => {
                    if (!acc[book.titre]) {
                        acc[book.titre] = {
                            ...book,
                            count: 0,
                            datesEmprunt: []
                        };
                    }
                    acc[book.titre].count += 1;
                    acc[book.titre].datesEmprunt.push(book.dateEmprunt.split('T')[0]);
                    return acc;
                }, {});

                const groupedBooksArray = Object.values(groupedBooks);
                setBorrowedBooks(groupedBooksArray);
            } catch (error) {
                console.error("Error fetching borrowed books", error);
            }
        };

        fetchBorrowedBooks();
    }, [loggedEmail]);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#5dc1b6] to-[#1E232F] text-white">
            <br />
            <br />

            <h2>Voici l'historique des livres que vous aviez empruntés</h2>
            <br />
            {borrowedBooks.length === 0 ? (
                <>
                    <br />
                    <p>Vous n'avez rien emprunté</p>
                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
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
                            <Card id="books" className="card" key={index}>
                                <Card.Img variant="top" src={book.image} className="card-img-top" />
                                <Card.Body className="card-body">
                                    <Card.Title>{book.titre}</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item><b>Nombre de fois emprunté: </b>{book.count}</ListGroup.Item>
                                    <ListGroup.Item>
                                        <b>Dates d'emprunts: </b>
                                        <ul>
                                            {book.datesEmprunt.map((date, idx) => (
                                                <li key={idx}>{date}</li>
                                            ))}
                                        </ul>
                                    </ListGroup.Item>
                                </ListGroup>
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

export default Historique;
