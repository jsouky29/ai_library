import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faUser, faRightFromBracket, faTicket, faComments, faPlus, faUndo, faHistory, faBars } from '@fortawesome/free-solid-svg-icons';
import { LoginContext } from '../../loginState';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
import logo from './favico.png';
import './header.css';

export default function Header() {
    const { changedLogin, isLogged } = useContext(LoginContext);
    const loggedEmail = localStorage.getItem('userEmail') || '';
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const signout = () => {
        changedLogin();
        navigate('/');
        localStorage.clear();
    };
    useEffect(() => {

        if (isLogged) {
            const fetchUser = async () => {
                try {
                    const res = await axios.get('http://localhost:3010/auth/user', {
                        params: { email: loggedEmail }
                    });
                    setUser(res.data);
                    console.log(user);
                } catch (error) {
                    console.log(loggedEmail);
                    console.error("Error fetching user data", error);
                }
            };
            fetchUser();
        }
    }, [isLogged, loggedEmail]);

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div >
                <Link to="/" className="contentNav">
                    <img
                        src={logo}
                        alt="Get Started"
                        style={{ width: "110px" }}
                    />                </Link>
            </div>
            <form className="d-flex">
                {isLogged ? (
                    <>
                        {user && user.admin === true && (
                            <Dropdown>
                                <Dropdown.Toggle variant="link" id="dropdown-admin" className="nav-link dropdown-toggle">
                                    Gestion d'administrateur
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Link to="/GestionUser" className="contentNav">
                                            Gestion des utilisateurs
                                        </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <Link to="/GestionBooks" className="contentNav">
                                            Gestion des livres
                                        </Link>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        )}

                        <Dropdown>
                            <Dropdown.Toggle variant="link" id="dropdown-profile" className="nav-link dropdown-toggle">
                                Actions
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Link to="/recc" className="contentNav">
                                        Recomendation de livres  <FontAwesomeIcon icon={faBars} />
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link to="/returnBook" className="contentNav">
                                        Retourner un livre  <FontAwesomeIcon icon={faUndo} />
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link to="/emprunterLivre" className="contentNav">
                                        Emprunter un livre  <FontAwesomeIcon icon={faPlus} /> {'  '}
                                    </Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="link" id="dropdown-profile" className="nav-link dropdown-toggle">
                                Profile
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Link to="/User" className="contentNav">
                                        Modifier profile  <FontAwesomeIcon icon={faUser} />
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link to="/delete" className="contentNav">
                                        Déactiver le compte <FontAwesomeIcon icon={faEraser} />
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <Link to="/history" className="contentNav">
                                        Historique d'emprunts <FontAwesomeIcon icon={faHistory} />
                                    </Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <button className="btn btn-outline-danger" type="button" onClick={signout}>
                            Déconnexion <FontAwesomeIcon icon={faRightFromBracket} />
                        </button>
                    </>

                ) : (
                    <>
                        <div className="marg">
                            <button className="btn btn-outline-success" type="button">
                                <Link to="/login" className="contentNav">
                                    Se connecter <i className="fa fa-sign-in"></i>
                                </Link>
                            </button>
                        </div>
                        <div className="marg">
                            <button className="btn btn-outline-success" type="button">
                                <Link to="/signup" className="contentNav">
                                    S'inscrire <i className="fa fa-pencil"></i>
                                </Link>
                            </button>
                        </div></>
                )}
            </form>
        </nav>
    );
}