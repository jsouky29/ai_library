import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './recc.css';
import { Spinner } from 'react-bootstrap';

function Recc() {
    const [recommendationsText, setRecommendations] = useState('');
    const [books, setBooks] = useState([]);
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const loggedEmail = localStorage.getItem('userEmail') || '';
    const [montrerSuccess, setMontrerSuccess] = useState(false);
    const [montrerError, setMontrerError] = useState(false);

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

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.get(`http://localhost:3010/auth/recc?email=${loggedEmail}`);
                setRecommendations(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching recommendations', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3010/livre/AllBooks');
                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching books", error);
            }
        };

        fetchRecommendations();
        fetchBooks();
    }, [loggedEmail]);

    useEffect(() => {
        if (recommendationsText && books.length) {
            const extractTitles = (text) => {
                const regex = /\d+\.\s*"([^"]+)"/g;
                let match;
                const titles = [];
                while ((match = regex.exec(text)) !== null) {
                    titles.push(match[1]);
                }
                return titles;
            };

            const bookTitles = extractTitles(recommendationsText);
            const filteredBooks = books.filter(book => bookTitles.includes(book.titre));
            setRecommendedBooks(filteredBooks);
        }
    }, [recommendationsText, books]);

    return (
        <main className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#5dc1b6] to-[#1E232F] text-white">
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
            <header className="p-4 border-b w-full max-w-3xl mx-auto">
                <motion.h1
                    className="text-6xl font-bold"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Recommended Books
                </motion.h1>
            </header>
            {loading ? (
                <div className="flex justify-center items-center h-96">
                    <Spinner animation="border" role="status" variant="light">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <section className="container px-0 pb-10 flex flex-col flex-grow gap-4 mx-auto max-w-5xl">
                    <motion.section
                        className="text-4l font-bold"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-4l font-bold">{recommendationsText}</p>
                    </motion.section>
                    <div className="grid w-full max-w-7xl px-4">
                        {recommendedBooks.map((book, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="card max-w-xs bg-white text-black">
                                    <Card.Img variant="top" src={book.image} className="card-img-top" />
                                    <Card.Body className="card-body">
                                        <Card.Title>{book.titre}</Card.Title>
                                        <Card.Text>{book.description}</Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item><b>Langage: </b> {book.langage}</ListGroup.Item>
                                        <ListGroup.Item><b>Auteur: </b> {book.auteur}</ListGroup.Item>
                                        <ListGroup.Item><b>Genre: </b> {book.genre}</ListGroup.Item>
                                        <ListGroup.Item><b>Copies restantes: </b> {book.copies}</ListGroup.Item>
                                    </ListGroup>
                                    <Card.Body>
                                        <Link to={`/book/${book._id}`} className="btn btn-outline btn-primary mr-4">Voir les Details</Link>
                                        <Card.Link className="btn btn-outline btn-primary" href="#" onClick={() => handleBorrow(book._id)}>Emprunter</Card.Link>
                                    </Card.Body>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}

export default Recc;
