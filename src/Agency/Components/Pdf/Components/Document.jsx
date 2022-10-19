import { React } from "react";
import { Document as PdfDocument } from "@react-pdf/renderer";

export const Document = ({ pdfMode, children }) => {
	return <>{pdfMode ? <PdfDocument>{children}</PdfDocument> : <>{children}</>}</>;
};
