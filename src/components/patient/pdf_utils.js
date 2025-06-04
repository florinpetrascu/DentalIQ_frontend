



import { jsPDF } from "jspdf";
import logo from "../../icons/logo1.png";
export const generatePdf = async (imageElement, teethList, firstName, lastName) => {
    const teethWithImages = await cropTeethFromRadiograph(imageElement, teethList);
    const doc = new jsPDF();
    doc.setFontSize(16);

    const base64Image = await convertImgToBase64FromImport(logo);
    doc.addImage(base64Image, 'PNG', 15, 10, 60, 12);


    // ➕ Informații în partea dreaptă sus
    doc.setFontSize(10);
    doc.setFont(undefined, "normal");

    const pageWidth = doc.internal.pageSize.getWidth();
    const rightMargin = 20;

    const currentDate = new Date().toLocaleDateString(); // Format local (ex: "27.05.2025")

    const lines = [
        "Dental Clinic",
        "doctor: Doctorname",
        `patient name: ${firstName}, ${lastName}`,
        `date: ${currentDate}`
    ];

    let lineY = 12;
    for (const line of lines) {
        const textWidth = doc.getTextWidth(line);
        const x = pageWidth - rightMargin - textWidth;
        doc.text(line, x, lineY);
        lineY += 5;
    }

    doc.setFont(undefined, "bold");
    doc.text("AI Dental Report", 85, 35);
    doc.setFontSize(12);

    let y = 45;

    // ➕ Radiografie panoramică
    const fullImage = new Image();
    fullImage.src = imageElement.src || imageElement;

    await new Promise((resolve) => {
        fullImage.onload = () => {
            const fullWidth = 160;
            const aspectRatio = fullImage.height / fullImage.width;
            const fullHeight = fullWidth * aspectRatio;

            if (y + fullHeight + 10 > 270) {
                doc.addPage();
                y = 20;
            }

            doc.setFont(undefined, "bold");
            doc.setTextColor(0, 0, 0); // negru
            doc.text("Panoramic Radiograph", 20, y);
            y += 6;

            doc.addImage(fullImage, 'PNG', 25, y, fullWidth, fullHeight);
            y += fullHeight + 10;

            resolve();
        };
    });

    // ➕ Dinți individuali
    for (const tooth of teethWithImages) {
        const hasIssues = tooth.issues && tooth.issues.length > 0;

        doc.setFont(undefined, "bold");
        doc.setTextColor(hasIssues ? 220 : 0, hasIssues ? 20 : 128, hasIssues ? 60 : 0); // roșu sau verde
        doc.text(`Tooth ${tooth.name}`, 20, y);
        y += 8;

        if (tooth.croppedImage) {
            const image = new Image();
            image.src = tooth.croppedImage;

            await new Promise((resolve) => {
                image.onload = () => {
                    const imageX = 25;
                    const imageWidth = image.width * 0.3;
                    const imageHeight = image.height * 0.3;
                    const textX = imageX + imageWidth + 10;

                    if (y + imageHeight + 10 > 270) {
                        doc.addPage();
                        y = 20;
                    }

                    doc.addImage(tooth.croppedImage, 'PNG', imageX, y, imageWidth, imageHeight);

                    doc.setFont(undefined, "normal");
                    //doc.setTextColor(0, 0, 0); // resetăm culoarea la negru pentru text

                    if (hasIssues) {
                        let textY = y + 6;
                        for (const issue of tooth.issues) {
                            doc.text(`- ${issue.name}`, textX, textY);
                            textY += 6;
                        }
                    } else {
                        doc.text("- No issues identified", textX, y + 6);
                    }

                    y += imageHeight + 10;
                    resolve();
                };
            });
        } else {
            doc.setFont(undefined, "normal");
            doc.setTextColor(0, 0, 0); // negru
            doc.text("- No image available", 25, y);
            y += 10;
        }

        y += 6;
    }

    const pdfBlob = doc.output("blob");
    const blobUrl = URL.createObjectURL(pdfBlob);
    window.open(blobUrl);
};

/**
 * Creează o listă de dinti cu imagini croppuite pe baza poligonului.
 * @param {HTMLImageElement} panoramicImage - Radiografia panoramică
 * @param {Array} teethList - Lista de dinți, fiecare cu polygon
 * @returns {Promise<Array>} - Lista de dinți cu câmp nou: croppedImage (base64)
 */
const cropTeethFromRadiograph = async (panoramicImage, teethList) => {


    // ✅ Sortăm numeric după numele dintelui
    const sortedTeeth = [...teethList].sort((a, b) => {
        return Number(a.name) - Number(b.name);
    });
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const originalWidth = panoramicImage.width;
    const originalHeight = panoramicImage.height;

    // Setăm dimensiunea canvasului cât imaginea panoramică
    canvas.width = originalWidth;
    canvas.height = originalHeight;

    ctx.drawImage(panoramicImage, 0, 0, originalWidth, originalHeight);


    const teethWithImages = await Promise.all(sortedTeeth.map(async (tooth) => {
        try {
            const polygon = JSON.parse(tooth.polygon); // [ [x, y], ... ]
            console.log("polygon" ,polygon);
            const xs = polygon.map(p => p[0] / 640 * originalWidth);
            const ys = polygon.map(p => p[1] / 350 * originalHeight);


            const minX = Math.max(Math.min(...xs) - 5, 0);
            const minY = Math.max(Math.min(...ys) - 5, 0);
            const maxX = Math.min(Math.max(...xs) + 5, originalWidth);
            const maxY = Math.min(Math.max(...ys) + 5, originalHeight);




            const width = maxX - minX;
            const height = maxY - minY;

            // ctx.strokeRect(minX, minY, width, height);
            // ctx.fillText(tooth.name, minX + 2, minY + 18);
            //
            const toothCanvas = document.createElement("canvas");
            const toothCtx = toothCanvas.getContext("2d");

            toothCanvas.width = width;
            toothCanvas.height = height;

            toothCtx.drawImage(canvas, minX, minY, width, height, 0, 0, width, height);

            const croppedImage = toothCanvas.toDataURL("image/png");

            return {
                ...tooth,
                croppedImage,
            };
        } catch (error) {
            console.error(`Error cropping tooth ${tooth.name}`, error);
            return {
                ...tooth,
                croppedImage: null,
            };
        }
    }));

    //return canvas.toDataURL("image/png");
    return teethWithImages;
};


// Convertor pentru fișier importat
const convertImgToBase64FromImport = (imgPath) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imgPath;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            const dataUrl = canvas.toDataURL("image/png");
            resolve(dataUrl);
        };

        img.onerror = (err) => reject("Failed to load image");
    });
};

export const exportRadiographWithBoxes = (panoramicImage, teethList) => {
    //const imageWithBoxes = drawBoundingBoxesOnRadiograph(panoramicImage, teethList);
    const imageWithBoxes = cropTeethFromRadiograph(panoramicImage, teethList);
    const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [panoramicImage.width, panoramicImage.height],
    });

    pdf.addImage(imageWithBoxes, "PNG", 0, 0, panoramicImage.width, panoramicImage.height);
    pdf.save("radiografie-cu-bboxuri.pdf");
};
/**
 * Desenează bounding boxes pentru fiecare dinte pe imaginea panoramică.
 * @param {HTMLImageElement} panoramicImage - Radiografia panoramică
 * @param {Array} teethList - Lista de dinți, fiecare cu polygon
 * @returns {string} - Imaginea cu bounding boxes (base64)
 */
const drawBoundingBoxesOnRadiograph = (panoramicImage, teethList) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const width = panoramicImage.width;
    const height = panoramicImage.height;

    canvas.width = width;
    canvas.height = height;

    // Desenăm imaginea originală
    ctx.drawImage(panoramicImage, 0, 0, width, height);

    // Stil pentru bbox-uri
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.font = "20px Arial";
    ctx.fillStyle = "yellow";

    for (const tooth of teethList) {
        try {
            const polygon = JSON.parse(tooth.polygon); // [ [x, y], ... ]
            const xs = polygon.map(p => p[0] / 640 * width);
            const ys = polygon.map(p => p[1] / 350 * height);

            const minX = Math.max(Math.min(...xs) - 5, 0);
            const minY = Math.max(Math.min(...ys) - 5, 0);
            const maxX = Math.min(Math.max(...xs) + 5, width);
            const maxY = Math.min(Math.max(...ys) + 5, height);

            const boxWidth = maxX - minX;
            const boxHeight = maxY - minY;

            ctx.strokeRect(minX, minY, boxWidth, boxHeight);
            ctx.fillText(tooth.name, minX + 2, minY + 18);
        } catch (error) {
            console.warn(`Eroare la desenarea dintelui ${tooth.name}:`, error);
        }
    }

    return canvas.toDataURL("image/png");
};

