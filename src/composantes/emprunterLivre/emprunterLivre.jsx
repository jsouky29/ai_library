import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './emprunterLivre.css';

function EmprunterLivre() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [montrerSuccess, setMontrerSuccess] = useState(false);
    const [montrerError, setMontrerError] = useState(false);
    const loggedEmail = localStorage.getItem('userEmail') || '';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3010/livre/AllBooks');
                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching books", error);
            }
        };

        fetchBooks();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleBorrow = async (bookId) => {
        try {
            const response = await axios.post(`http://localhost:3010/livre/borrow/${bookId}?email=${loggedEmail}`);
            if (response.status === 200) {
                setMontrerSuccess(true);
                setMontrerError(false);
                const updatedResponse = await axios.get('http://localhost:3010/livre/AllBooks');
                setBooks(updatedResponse.data);
                setTimeout(() => setMontrerSuccess(false), 5000);
            }
        } catch (error) {
            setMontrerSuccess(false);
            setMontrerError(true);
            setTimeout(() => setMontrerError(false), 5000);
            console.error("Error borrowing book", error);
        }
    };

    const filteredBooks = books.filter((book) =>
        book.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.auteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.langage.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#5dc1b6] to-[#1E232F] text-black">
            {montrerError && (
                <div className="w-full alert alert-danger">
                    <strong>Error!</strong> Il ne reste plus de copies
                </div>
            )}
            {montrerSuccess && (
                <div className="w-full alert alert-success">
                    <strong>Success!</strong> Le livre a été emprunté avec succès.
                </div>
            )}
            <input
                type="text"
                placeholder="Cherchez un livre par son titre, genre, langage ou auteur"
                value={searchTerm}
                onChange={handleSearch}
                className="search-input mb-4"
            />
            <div className="grid w-full max-w-7xl px-4">
                {filteredBooks.map((book, index) => (
                    book.copies > 0 && (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card id="books" className="card">
                                <Card.Img variant="top" src={book.image} className="card-img-top" />
                                <Card.Body className="card-body">
                                    <Card.Title>{book.titre}</Card.Title>
                                    <Card.Text>{book.description}</Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item><b>Langage: </b>{book.langage}</ListGroup.Item>
                                    <ListGroup.Item><b>Auteur:</b> {book.auteur}</ListGroup.Item>
                                    <ListGroup.Item><b>Genre: </b>{book.genre}</ListGroup.Item>
                                    <ListGroup.Item><b>Copies restantes: </b>{book.copies}</ListGroup.Item>
                                </ListGroup>
                                <Card.Body>
                                    <Link to={`/book/${book._id}`} className="btn btn-outline-primary mr-4">Voir les Details</Link>
                                    <Card.Link className="btn btn-outline-primary" href="#" onClick={() => handleBorrow(book._id)}>Emprunter</Card.Link>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    )
                ))}

            </div>
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

export default EmprunterLivre;
