import { React, useState } from "react";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { CustomerForm } from "../../Components/Forms/CustomerForm";
import { VerticalTimeLine } from "../../Components/TimeLine/VerticalTimeLine";
import { CustomerSearchForm } from "../../Components/Forms/CustomerSearchForm";
import { Tabs } from "flowbite-react";
import { RecieverForm } from "../../Components/Forms/RecieverForm";
import { ProductForm } from "../../Components/Forms/ProductForm";
import { ServiceForm } from "../../Components/Forms/ServiceForm";
import { Factura } from "../../Components/Pdf/Factura";

export const CreateOrder = () => {

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

					<div className="mt-6 ">
						{formStep === 0 ? <CustomerSearchForm /> : ""}
						{getStepContent()}
					</div>
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
