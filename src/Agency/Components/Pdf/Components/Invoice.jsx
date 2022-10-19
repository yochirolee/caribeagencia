import { React } from "react";
import { Document } from "./Document";
import { Page } from "./Page";
import { View } from "./View";
export const Invoice = ({pdfMode}) => {
	return (
		<>
			<Document pdfMode={pdfMode}>
				<Page pdfMode={pdfMode}>
					<View pdfMode={pdfMode}>
						<span>This is a test</span>
					</View>
				</Page>
			</Document>
		</>
	);
};
