import { Label, TextInput, Button } from "flowbite-react";
import { React } from "react";
export const CustomerForm = () => {
	return (
		<form className="flex flex-col gap-4 bg-white border p-2 rounded-xl ">
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
		</form>
	);
};
