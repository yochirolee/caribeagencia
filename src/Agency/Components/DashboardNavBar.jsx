import { Navbar, Dropdown, Avatar } from "flowbite-react";
import { React } from "react";
import { useDispatch } from "react-redux";
import { setToggleMainMenu } from "../Store/Slices/Ui/uiSlice";
export const DashboardNavbar = () => {
	const dispatch=useDispatch();

	return (
		<Navbar fluid={true}>
			<div></div>
			<div className="flex space-x-2   justify-self-end md:order-2">
				<Dropdown
					arrowIcon={false}
					inline={true}
					label={
						<Avatar
							alt="User settings"
							img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
							rounded={true}
						/>
					}
				>
					<Dropdown.Header>
						<span className="block text-sm">Bonnie Green</span>
						<span className="block truncate text-sm font-medium">name@flowbite.com</span>
					</Dropdown.Header>
					<Dropdown.Item>Dashboard</Dropdown.Item>
					<Dropdown.Item>Settings</Dropdown.Item>
					<Dropdown.Item>Earnings</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item>Sign out</Dropdown.Item>
				</Dropdown>
				<Navbar.Toggle onClick={()=>dispatch(setToggleMainMenu())} />
			</div>
		</Navbar>
	);
};
