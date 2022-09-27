import { React } from "react";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Button, Checkbox, Label, Tabs, TextInput, Timeline } from "flowbite-react";
import { CustomerForm } from "./Forms/CustomerForm";

export const CreateOrders = () => {
	return (
		<Tabs.Group aria-label="Tabs with icons" style="underline">
			<Tabs.Item active={true} title="Regular" icon={HiUserCircle}>
				<div className="grid md:grid-cols-2 grid-rows-2 gap-4 space-x-8">
					<CustomerForm />
					<form className="flex flex-col gap-4">
						<div>
							<div className="mb-2 block">
								<Label htmlFor="email2" value="Your email" />
							</div>
							<TextInput
								id="email2"
								type="email"
								placeholder="name@flowbite.com"
								required={true}
								shadow={true}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="password2" value="Your password" />
							</div>
							<TextInput id="password2" type="password" required={true} shadow={true} />
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="repeat-password" value="Repeat password" />
							</div>
							<TextInput id="repeat-password" type="password" required={true} shadow={true} />
						</div>

						<Button type="submit">Register new account</Button>
					</form>
				</div>
				<button>Siguiente</button>
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
