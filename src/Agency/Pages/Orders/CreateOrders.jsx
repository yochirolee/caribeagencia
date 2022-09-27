import { React } from "react";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Button, Checkbox, Label, Tabs, TextInput, Timeline } from "flowbite-react";
import { CustomerForm } from "../../Components/Forms/CustomerForm";
import { VerticalTimeLine } from "../../Components/TimeLine/VerticalTimeLine";

export const CreateOrders = () => {
	return (
		<Tabs.Group aria-label="Tabs with icons" style="underline">
			<Tabs.Item active={true} title="Regular" icon={HiUserCircle}>
				<VerticalTimeLine/>
			
					<div className="border grid grid-rows-1 md:grid-cols-2 md:grid-rows-2 gap-4 space-x-8">
						<CustomerForm />
						<CustomerForm />
						<button>Siguiente</button>
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
