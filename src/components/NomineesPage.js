import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, logout } from "../redux/auth/authSlice";
import nomineesData from "../nomineesData.json";
import NomineeCard from "./NomineeCard";
import SubmitButtonModal from "./SubmitButtonModal";
import "./NomineesPage.css";
import { resetNominee } from "../redux/nominees/nomineesSlice";
import Loading from "./Loading";

const NomineesPage = () => {
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(resetNominee());
    dispatch(logout());
    navigate("/");
  };

  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNominees, setSelectedNominees] = useState({});

  useEffect(() => {
    const delay = setTimeout(() => {
      setCategories(nomineesData.categories);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(loginSuccess(JSON.parse(storedUser)));
    } else {
      navigate("/");
    }
  }, [dispatch, navigate]);

  const handleSubmit = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const isSubmitDisabled = Object.keys(selectedNominees).length === 0;

  return (
    <div className="nominees-page-container">
      <nav className="navbar">
        <div className="navbar-item">Hi, {user?.username}</div>
        <div className="navbar-item">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      <h1 className="page-title">Awards 2021</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="nominee-cards-container">
            {categories.map((category) => (
              <NomineeCard
                key={category.id}
                categoryId={category.id}
                nominees={category.nominees}
                selectedNominees={selectedNominees}
                setSelectedNominees={setSelectedNominees}
              />
            ))}
          </div>
          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            Submit
          </button>
        </>
      )}

      {isModalOpen && (
        <SubmitButtonModal isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default NomineesPage;
