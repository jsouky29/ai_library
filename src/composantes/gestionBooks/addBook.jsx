import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from 'react-router-dom';

function AddBook() {
    const navigate = useNavigate();
    const [titre, setTitre] = useState("");
    const [auteur, setAuteur] = useState("");
    const [isbn, setIsbn] = useState("");
    const [datePublication, setDatePublication] = useState("");
    const [genre, setGenre] = useState("");
    const [pages, setPages] = useState("");
    const [langage, setLangage] = useState("");
    const [editeur, setEditeur] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [copies, setCopies] = useState("");
    const [montrerError, setMontrerError] = useState(false);
    const [montrerErrorValidation, setMontrerErrorValidation] = useState(false);

    const validateForm = () => {
        const nameRegex = /^[a-zA-Z\s]+$/;
        const phoneRegex = /^[+\d\s-]+$/;


        if (!nameRegex.test(auteur)) {
            console.log("Invalid name format");
            setMontrerErrorValidation(true);
            return false;
        }
        if (!nameRegex.test(genre)) {
            console.log("Invalid name format");
            setMontrerErrorValidation(true);
            return false;
        } if (!nameRegex.test(langage)) {
            console.log("Invalid name format");
            setMontrerErrorValidation(true);
            return false;
        }
        if (!phoneRegex.test(isbn)) {
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
            const res = await axios.post('http://localhost:3010/livre/newBook', {
                titre,
                auteur,
                isbn,
                datePublication,
                genre,
                pages,
                langage,
                editeur,
                description,
                image,
                copies

            });
            if (res.status === 201) {
                navigate('/GestionBooks');
            }
        } catch (error) {
            console.error("Error:", error);
            setMontrerError(true);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#5dc1b6] to-[#1E232F] text-black">
            {montrerError && (
                <div className="w-full alert alert-danger">
                    <strong>Error!</strong> Assurez-vous d'utiliser un ISBN non inscrit.
                </div>
            )}
            {montrerErrorValidation && (
                <div className="w-fullvalert alert-danger">
                    <strong>Error!</strong> Assurez-vous que tous les champs sont valides.
                </div>
            )}
            <div className='auth-form-container'>
                <h2>Ajouter un livre</h2>
                <br />

                <Form id='frmSignup' onSubmit={handleSubmit}>
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="titre">Titre :</Form.Label>
                        <Form.Control
                            type="text"
                            id="titre"
                            placeholder="Le titre complet"
                            value={titre}
                            onChange={(e) => setTitre(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="auteur">Auteur :</Form.Label>
                        <Form.Control
                            type="text"
                            id="auteur"
                            placeholder="Nom complet de l'auteur"
                            value={auteur}
                            onChange={(e) => setAuteur(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="number">ISBN :</Form.Label>
                        <Form.Control
                            type="number"
                            id="isbn"
                            placeholder="ISBN"
                            value={isbn}
                            onChange={(e) => setIsbn(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="date">Date de publication :</Form.Label>
                        <Form.Control
                            type="date"
                            id="datePublication"
                            value={datePublication}
                            onChange={(e) => setDatePublication(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="genre">Genre :</Form.Label>
                        <Form.Control
                            type="text"
                            id="genre"
                            placeholder="Genre du livre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="pages">Pages :</Form.Label>
                        <Form.Control
                            type="number"
                            id="pages"
                            placeholder="Nombre de pages"
                            value={pages}
                            onChange={(e) => setPages(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="langage">Langage :</Form.Label>
                        <Form.Control
                            type="text"
                            id="langage"
                            placeholder="Langage du livre"
                            value={langage}
                            onChange={(e) => setLangage(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="editeur">Editeur :</Form.Label>
                        <Form.Control
                            type="text"
                            id="editeur"
                            placeholder="Editeur du livre"
                            value={editeur}
                            onChange={(e) => setEditeur(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="description">Description :</Form.Label>
                        <Form.Control
                            type="description"
                            id="description"
                            placeholder="Description du livre"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="description">URL image :</Form.Label>
                        <Form.Control
                            type="url"
                            id="image"
                            placeholder="URL de l'image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <br />
                    <Form.Group className="form-group">
                        <Form.Label htmlFor="description">Copies :</Form.Label>
                        <Form.Control
                            type="number"
                            id="copies"
                            placeholder="Copies disponible"
                            value={copies}
                            onChange={(e) => setCopies(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <br />

                    <Button type="submit" className="btn btn-primary" id='signup'>Inscription</Button>
                    <br />

                </Form>
            </div>
            <br />
            <br />
            <br />

        </div>
    );
}

export default AddBook;
