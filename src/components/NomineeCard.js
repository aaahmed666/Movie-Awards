import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deselectNominee,
  selectNominee,
} from "../redux/nominees/nomineesSlice";
import "./NomineeCard.css";
import noimage from "../image/noimage.png";

const NomineeCard = ({
  categoryId,
  nominees,
  selectedNominees,
  setSelectedNominees,
}) => {
  const dispatch = useDispatch();
  const selectedNominee = useSelector(
    (state) => state.nominees.selectedNominees[categoryId]
  );

  const handleNomineeClick = (nominee) => {
    const isNomineeSelected = selectedNominees[categoryId] === nominee;

    if (isNomineeSelected) {
      dispatch(deselectNominee({ categoryId }));
      setSelectedNominees({ ...selectedNominees, [categoryId]: null });
    } else {
      dispatch(selectNominee({ categoryId, nominee }));
      setSelectedNominees({ ...selectedNominees, [categoryId]: nominee });
    }
  };

  return (
    <div className="nominee-card">
      <h2>Category {categoryId}</h2>
      <ul>
        {nominees?.map((nominee, index) => (
          <li
            key={index}
            className={selectedNominee === nominee ? "selected" : ""}
          >
            <p>{nominee.name}</p>

            <img src={noimage} alt={nominee.name} />

            <button
              className="nominee-btn"
              onClick={() => handleNomineeClick(nominee)}
            >
              Select
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NomineeCard;
