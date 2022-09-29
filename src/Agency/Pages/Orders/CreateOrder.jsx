import { React, useState } from "react";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { CustomerForm } from "../../Components/Forms/CustomerForm";
import { VerticalTimeLine } from "../../Components/TimeLine/VerticalTimeLine";
import { CustomerSearchForm } from "../../Components/Forms/CustomerSearchForm";
import { db_GetCustomers } from "../../../Supabase/Customers_db/Customers_db";
import { Tabs } from "flowbite-react";
import { RecieverForm } from "../../Components/Forms/RecieverForm";
import { ProductForm } from "../../Components/Forms/ProductForm";
import { ServiceForm } from "../../Components/Forms/ServiceForm";
import { Factura } from "../../Components/Pdf/Factura";

export const CreateOrder = () => {
	/*const customersResult = async () => {
		const { data, error } = await db_GetCustomers();
		console.log(data, error, "CustomersList");
	};

	useEffect(() => {
		customersResult();
	}, []);
*/
	const [formStep, setFormStep] = useState(0);

	const handleNextStep = () => {
		setFormStep(formStep + 1);
	};
	const handlePrevStep = () => {
		if (step >= 0) setFormStep(formStep - 1);
	};

	const handleSetFormStep = (step) => {
		setFormStep(step);
	};

	const getStepContent = () => {
		switch (formStep) {
			case 0:
				return <CustomerForm handleNextStep={handleNextStep} />;
			case 1:
				return <RecieverForm handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />;
			case 2:
				return <ProductForm handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />;
			case 3:
				return <ServiceForm handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} />;
			case 4:
				return <Factura />;

			default:
				break;
		}
	};

	return (
		<Tabs.Group aria-label="Tabs with icons" style="underline">
			<Tabs.Item active={true} title="Regular" icon={HiUserCircle}>
				<div className="flex-col md:flex-row mx-auto">
					<VerticalTimeLine formStep={formStep} handleSetFormStep={handleSetFormStep} />
					{formStep === 0 ? <CustomerSearchForm /> : ""}

					<div className=" border   bg-white rounded-lg p-6 justify-center">{getStepContent()}</div>
				</div>
			</Tabs.Item>
			<Tabs.Item title="ENA" icon={MdDashboard}>
				ENA
			</Tabs.Item>
			<Tabs.Item title="Menaje" icon={HiAdjustments}>
				Menaje
			</Tabs.Item>
		</Tabs.Group>
	);
};
