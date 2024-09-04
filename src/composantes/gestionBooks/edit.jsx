import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function EditBook() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        titre: '',
        auteur: '',
        isbn: '',
        datePublication: '',
        genre: '',
        pages: '',
        langage: '',
        editeur: '',
        description: '',
        image: '',
        copies: ''
    });
    const [montrerErrorValidation, setMontrerErrorValidation] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`http://localhost:3010/livre/bookId/${id}`);
                const bookData = res.data;

                setFormData({
                    titre: bookData.titre,
                    auteur: bookData.auteur,
                    isbn: bookData.isbn,
                    datePublication: bookData.datePublication.split('T')[0], // Format the date for input[type="date"]
                    genre: bookData.genre,
                    pages: bookData.pages,
                    langage: bookData.langage,
                    editeur: bookData.editeur,
                    description: bookData.description,
                    image: bookData.image,
                    copies: bookData.copies,
                });
            } catch (error) {
                console.error("Error fetching book", error);
            }
        };

        fetchBook();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const nameRegex = /^[a-zA-Z\s]+$/;
        const isbnRegex = /^[0-9-]+$/;

        // if (!nameRegex.test(formData.auteur)) {
        //     console.log("Invalid name format");
        //     setMontrerErrorValidation(true);
        //     return false;
        // }
        if (!nameRegex.test(formData.genre)) {
            console.log("Invalid genre format");
            setMontrerErrorValidation(true);
            return false;
        }
        if (!nameRegex.test(formData.langage)) {
            console.log("Invalid langage format");
            setMontrerErrorValidation(true);
            return false;
        }
        if (!isbnRegex.test(formData.isbn)) {
            console.log("Invalid ISBN format");
            setMontrerErrorValidation(true);
            return false;
        }

        setMontrerErrorValidation(false);
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await axios.put('http://localhost:3010/livre/update', formData);
            navigate('/gestionBooks');
        } catch (error) {
            console.error("Error updating book", error);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#5dc1b6] to-[#1E232F] text-black">
            {montrerErrorValidation && (
                <div className="w-full alert alert-danger">
                    <strong>Error!</strong> Les informations saisies sont invalides.
                </div>
            )}
            <div className='auth-form-container'>
                <h2>Changer les informations</h2>
                <br />
                <Form id='frmSignup' onSubmit={handleSubmit}>
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="titre">Titre :</Form.Label>
                        <Form.Control
                            type="text"
                            id="titre"
                            name="titre"
                            placeholder="Le titre complet"
                            value={formData.titre}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="auteur">Auteur :</Form.Label>
                        <Form.Control
                            type="text"
                            id="auteur"
                            name="auteur"
                            placeholder="Nom complet de l'auteur"
                            value={formData.auteur}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="isbn">ISBN :</Form.Label>
                        <Form.Control
                            type="text"
                            id="isbn"
                            name="isbn"
                            placeholder="ISBN"
                            value={formData.isbn}
                            onChange={handleChange}
                            required
                            disabled

                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="datePublication">Date de publication :</Form.Label>
                        <Form.Control
                            type="date"
                            id="datePublication"
                            name="datePublication"
                            value={formData.datePublication}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="genre">Genre :</Form.Label>
                        <Form.Control
                            type="text"
                            id="genre"
                            name="genre"
                            placeholder="Genre du livre"
                            value={formData.genre}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="pages">Pages :</Form.Label>
                        <Form.Control
                            type="number"
                            id="pages"
                            name="pages"
                            placeholder="Nombre de pages"
                            value={formData.pages}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="langage">Langage :</Form.Label>
                        <Form.Control
                            type="text"
                            id="langage"
                            name="langage"
                            placeholder="Langage du livre"
                            value={formData.langage}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="editeur">Editeur :</Form.Label>
                        <Form.Control
                            type="text"
                            id="editeur"
                            name="editeur"
                            placeholder="Editeur du livre"
                            value={formData.editeur}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="description">Description :</Form.Label>
                        <Form.Control
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Description du livre"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="image">URL image :</Form.Label>
                        <Form.Control
                            type="url"
                            id="image"
                            name="image"
                            placeholder="URL de l'image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="copies">Copies :</Form.Label>
                        <Form.Control
                            type="number"
                            id="copies"
                            name="copies"
                            placeholder="Copies disponibles"
                            value={formData.copies}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Button type="submit" className="btn btn-primary">Mettre à jour</Button>
                </Form>
            </div>
            <br />
            <br />
            <br />
        </div>
    );
}

export default EditBook;
