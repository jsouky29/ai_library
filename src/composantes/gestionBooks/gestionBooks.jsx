import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './gestionBooks.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

function GestionBooks() {
    const [books, setBooks] = useState([]);
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

    const handleDelete = async (bookId) => {
        try {
            await axios.delete(`http://localhost:3010/livre/delete/${bookId}`);
            setBooks(books.filter(book => book._id !== bookId));
        } catch (error) {
            console.error("Error deleting book", error);
        }
    };



    const count = books.length;

    const renderAdditionalBreaks = (count) => {
        let amount;
        let breaks = [];
        if (count <= 9 && count > 5) {
            amount = 17 - count;
            breaks = Array(amount).fill(<br />);
        } else if (count <= 5 && count > 3) {
            amount = 19 - count;
            breaks = Array(amount).fill(<br />);
        } else if (count <= 3) {
            amount = 23 - count;
            breaks = Array(amount).fill(<br />);
        } else {
            breaks = Array(0).fill(<br />);
        }
        return breaks;
    };

    return (
        <div className="items-center min-h-screen bg-gradient-to-b from-[#5dc1b6] to-[#1E232F] text-white">
            <br />
            <br />
            <h1>Gestion des livres</h1>
            <br />
            <div class="d-grid gap-2">
                <a id='add-book' class="btn btn-primary" onClick={() => navigate(`/AddBook/`)}>Ajouter un livre</a>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Titre</th>
                        <th>Auteur</th>
                        <th>ISBN</th>
                        <th>Genre</th>
                        <th>Langage</th>
                        <th>Editeur</th>
                        <th>Copies</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={book._id}>
                            <td>{index + 1}</td>
                            <td><img src={book.image} height="120" width="100"></img></td>
                            <td>{book.titre}</td>
                            <td>{book.auteur}</td>
                            <td>{book.isbn}</td>
                            <td>{book.genre}</td>
                            <td>{book.langage}</td>
                            <td>{book.editeur}</td>
                            <td>{book.copies}</td>

                            <td>

                                <Button variant="primary" onClick={() => navigate(`/editBook/${book._id}`)}>Modifier</Button>{' '}
                                <Button variant="danger" onClick={() => handleDelete(book._id)}>Supprimer</Button>{' '}

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {renderAdditionalBreaks(count)}
            <footer className="w-full py-8 bg-[#28201e] text-center text-sm text-white">
                <p>&copy; 2024 AI Library Platform. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default GestionBooks;
