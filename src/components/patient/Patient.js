import React, { useEffect, useState } from 'react';
import {useParams, useLocation} from 'react-router-dom';
import "./Patients.css";
import Tooth from "./Tooth";
import "./Patient.css" ;


const Patient = () => {

    const { id } = useParams();
    const location = useLocation();
    let patient = location.state?.patient;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedTooth, setSelectedTooth] = useState(null); // Dintele selectat
    const [teeth, setTeeth] = useState([]);
    const [imageFile, setImageFile] = useState(null); // Fișierul de imagine
    const [previewImage, setPreviewImage] = useState(null); // Imaginea pentru previzualizare
    const [patientHere,setPatientHere] = useState(patient)
    const [hoveredTooth, setHoveredTooth] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // eslint-disable-next-line
    useEffect(() => {
        console.log("useEffect");
        if (patientHere) {
            setFirstName(patientHere.firstName);
            setLastName(patientHere.lastName);
            setPhoneNumber(patientHere.phoneNumber);
            setTeeth(patientHere.teeths);
            if (patientHere.image) {
                setPreviewImage(`data:image/jpeg;base64,${patientHere.image}`);
            }

        } else {
            // Fetch patient data from API if not passed through state
            fetch(`/api/patients/${id}`)
                .then(res => res.json())
                .then(data => {
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setPhoneNumber(data.phoneNumber);
                })
                .catch(error => console.error("Error fetching patient:", error));
        }
    }, [patientHere, id]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImageFile(file);

        // Creează o previzualizare locală a imaginii
        const reader = new FileReader();
        reader.onload = (e) => setPreviewImage(e.target.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageFile) {
            alert("Please upload an image before submitting.");
            return;
        }
        setIsSubmitting(true); // Dezactivează formularul și afișează spinner-ul
        // Encodează imaginea în Base64
        const reader = new FileReader();
        reader.onload = async () => {
            const imageBase64 = reader.result.split(',')[1]; // Extrage doar partea Base64

            const payload = {
                patient_data: { id,firstName, lastName, phoneNumber, teeth },
                image: imageBase64
            };

            try {
                const response = await fetch("/api/upload", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });


                const data = await response.json();
                console.log("Server response:", data);

                setPatientHere(data);
            } catch (error) {
                console.error("Error uploading patient:", error);
            }
            finally {
                setIsSubmitting(false);
            }
        };
        reader.readAsDataURL(imageFile);
    };

    const handleToothClick = (tooth) => {
        console.log(`Teeth clicked`);

        console.log(tooth);

        setSelectedTooth(tooth);

    };

    const handleToothHover = (toothName) => {
        console.log(`Teeth hover start`);
        console.log(toothName);
        setHoveredTooth(toothName); // Setează dintele curent
    };

    const handleToothHoverEnd = () => {
        console.log(`Teeth hover end`);
        console.log(hoveredTooth);
        setHoveredTooth(null); // Resetează dintele curent
    };

    return (
        <div className={`main-content ${isSubmitting ? "disabled" : ""}`}>
            {isSubmitting && (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            )}
            <div className='left-content'>

                    <div className="chart_img">



                        {/* Crearea butoanelor din 1 până la 32 */}
                        {Array.from({ length: 32 }, (_, index) => {
                            const toothNumber = index + 1;
                            const tooth = teeth.find((t) => t.name === toothNumber.toString());
                            const isExisting = teeth.some((tooth) => tooth.name === toothNumber.toString()); // Verifică dacă toothNumber este egal cu tooth.name

                            return (
                                <button
                                    key={index}
                                    className={`teeth_buton  ${isExisting ? "isExisting" : "isMissing"} teeth_buton${toothNumber}`}
                                    onClick={() => handleToothClick(tooth)}
                                    onMouseEnter={() => handleToothHover(toothNumber.toString())}
                                    onMouseLeave={handleToothHoverEnd}
                                    disabled={isSubmitting}
                                >
                                 {`${toothNumber}`}
                                </button>
                            );
                        })}

                    </div>

                {/* Imaginea panoramică */}
                <div >
                    {previewImage && (
                        <div  className="image-preview-wrapper">
                            <img src={previewImage} alt="Preview" className="image-preview" />

                            {/* Poligoane pentru fiecare dinte */}
                            {teeth.map((tooth, index) => {

                                const points = JSON.parse(tooth.polygon)
                                    .map(([x, y]) => `${x / 10}% ${y / 10}%`) // Normalizează punctele pentru proporții relative
                                    .join(", ");
                               // const points = "0% 0%, 100% 0%, 50% 100% ,30% 70% ,50% 20%";
                                console.log("points")
                                console.log(points)
                                return (
                                    <div
                                        key={index}
                                        //className={"tooth-polygon"}
                                        className={`tooth-polygon ${hoveredTooth === tooth.name ? "visible" : ""}`}
                                        style={{
                                            position: "absolute",  // Permite poziționarea relativă față de imagine
                                            top: "60px",  // Ajustează poziția în funcție de imaginea ta
                                            left: "35px",  // Ajustează poziția în funcție de imaginea ta
                                            width: "1650px",
                                            height: "1400px",
                                            // backgroundColor: "green",  // Fundal pentru a face poligonul vizibil
                                            clipPath: `polygon(${points})`,  // Poligon triunghiular
                                            zIndex: 10  // Asigură-te că poligonul apare deasupra imaginii
                                        }}
                                    ></div>
                                );
                            })}

                                   {/*<div*/}

                                   {/*     className={`cover-image ${hoveredTooth != null ? "visible" : ""}` }*/}
                                   {/*      style={{*/}
                                   {/*         position: "absolute",*/}
                                   {/*         zIndex: 10*/}
                                   {/*     }}*/}
                                   {/*></div>*/}
                        </div>
                    )}
                </div>

                {/*<div>*/}
                {/*    {previewImage && <img src={previewImage} alt="Preview" className="image-preview" />}*/}
                {/*</div>*/}



                </div>





            {/* Partea dreaptă - Detalii dinte */}
            <div className="right-content">
                <form onSubmit={handleSubmit} className="patient-form">

                        <input
                            className="input-bar"
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            required
                            disabled={isSubmitting}
                        />
                        <input
                            className="input-bar"
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            required
                            disabled={isSubmitting}
                        />
                        <input
                            className="input-bar"
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Phone Number"
                            required
                            disabled={isSubmitting}
                        />


                    <input id="file-upload" type="file" accept="image/*"  className="hidden-input" onChange={handleImageUpload} disabled={isSubmitting}/>

                    <label type="upload" htmlFor="file-upload" className="submit-button upload">
                        <p className="text_upload">X-ray Upload </p>
                    </label>

                    <button type="submit" className="submit-button send" onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Loading..." : "AI Scan"}
                    </button>

                </form>




                {selectedTooth ? (
                    <Tooth tooth={selectedTooth} />
                ) : (
                    <p className="tratament-item">Select a tooth to see details.</p>
                )}


            </div>




        </div>
    );
};

export default Patient;
