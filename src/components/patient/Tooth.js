

import React, { useState, useEffect } from "react";
import "./Tooth.css";
import "./Patients.css"


// Lista categoriilor
const treatments = [
    "Implant",
    "Prosthetic restoration",
    "Obturation",
    "Endodontic treatment",
    "Apical surgery",
    "Orthodontic device",
    "Surgical device",
];

const Tooth = ({ tooth }) => {
    const [toothName, setName] = useState("");
    const [diseases, setDiseases] = useState([]);
    const [toothTreatments, setTreatments] = useState([]);
    const [notes, setNotes] = useState("");

    useEffect(() => {
        if (tooth) {
            setName(tooth.name);
            const issues = tooth.issues || [];
            const foundDiseases = issues.filter(
                (issue) => !treatments.includes(issue.name)
            );
            const foundTreatments = issues.filter((issue) =>
                treatments.includes(issue.name)
            );
            setDiseases(foundDiseases);
            setTreatments(foundTreatments);
            setNotes(tooth.notes || "Nicio notă suplimentară");
        }
    }, [tooth]);

    return (
        <form className="patient-form">
            <h3>Tooth Info</h3>
            <input
                className="input-bar"
                type="text"
                value={toothName}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tooth Name"
                required
            />

            <div className="tooth-info">
                <p>
                    <strong>Issues:</strong>
                </p>
                {diseases.length > 0 ? (
                    <ul className="issues-list">
                        {diseases.map((disease, index) => (
                            <li key={index} className="issue-item">
                                {disease.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-issues">No disease identified</p>
                )}

                <p>
                    <strong>Treatments:</strong>
                </p>
                {toothTreatments.length > 0 ? (
                    <ul className="issues-list">
                        {toothTreatments.map((treatment, index) => (
                            <li key={index} className="tratament-item">
                                {treatment.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-issues">No treatment identified</p>
                )}
            </div>
        </form>
    );
};

export default Tooth;
