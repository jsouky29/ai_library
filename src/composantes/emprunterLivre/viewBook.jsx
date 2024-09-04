import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './viewBook.css';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [montrerSuccess, setMontrerSuccess] = useState(false);
    const [montrerError, setMontrerError] = useState(false);
    const loggedEmail = localStorage.getItem('userEmail') || '';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:3010/livre/bookId/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error("Error fetching book details", error);
            }
        };

        fetchBook();
    }, [id]);
    const handleBorrow = async (id) => {
        try {
            const response = await axios.post(`http://localhost:3010/livre/borrow/${id}?email=${loggedEmail}`);
            if (response.status === 200) {
                setMontrerSuccess(true);
                setMontrerError(false);
                const updatedResponse = await axios.get(`http://localhost:3010/livre/bookId/${id}`);
                setBook(updatedResponse.data);
                setTimeout(() => setMontrerSuccess(false), 5000);
            }
        } catch (error) {
            setMontrerSuccess(false);
            setMontrerError(true);
            setTimeout(() => setMontrerError(false), 5000);
            console.error("Error borrowing book", error);
        }
    };
    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#5dc1b6] to-[#1E232F] text-white">
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

            <Card className="book-detail">
                <Card.Img variant="top" src={book.image} />
                <Card.Body>
                    <Card.Title>{book.titre}</Card.Title>
                    <Card.Text>{book.description}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item><b>Auteur:</b> {book.auteur}</ListGroup.Item>
                    <ListGroup.Item><b>Copies restantes: </b>{book.copies}</ListGroup.Item>
                    <ListGroup.Item><b>Editeur: </b>{book.editeur}</ListGroup.Item>
                    <ListGroup.Item><b>ISBN: </b>{book.isbn}</ListGroup.Item>
                    <ListGroup.Item><b>Date de publication: </b>{book.datePublication.split('T')[0]}</ListGroup.Item>
                    <ListGroup.Item><b>Genre: </b>{book.genre}</ListGroup.Item>
                    <ListGroup.Item><b>Pages: </b>{book.pages}</ListGroup.Item>
                    <ListGroup.Item><b>Langage: </b>{book.langage}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-outline-primary mr-4"
                    >
                        Revenir
                    </button>
                    <button
                        onClick={() => handleBorrow(id)}
                        className="btn btn-outline-primary"
                    >
                        Emprunter
                    </button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default BookDetail;
