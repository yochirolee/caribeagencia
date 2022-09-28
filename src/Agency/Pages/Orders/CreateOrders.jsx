import { React, useEffect ,useState} from "react";
import { HiAdjustments, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Button, Checkbox, Label, Tabs, TextInput, Timeline } from "flowbite-react";
import { CustomerForm } from "../../Components/Forms/CustomerForm";
import { VerticalTimeLine } from "../../Components/TimeLine/VerticalTimeLine";
import { CustomerSearchForm } from "../../Components/Forms/CustomerSearchForm";
import { getCustomers } from "../../../Supabase/Customers_db/Customers_db";

export const CreateOrders = () => {
	const [customers,setCustomers]=useState([]);
    

	const customersResult=async()=>{
      const {data,error}=await getCustomers()
	  console.log(data,error,"CustomersList");
	}

	useEffect(()=>{
		getCustomers()
	},[])



	return (
		<Tabs.Group aria-label="Tabs with icons" style="underline">
			<Tabs.Item active={true} title="Regular" icon={HiUserCircle}>
				<div className="flex-col md:flex-row mx-auto md:w-1/2">
					<VerticalTimeLine />
					<CustomerSearchForm />

					<div className=" border   bg-white rounded-lg p-6 justify-center">
						<CustomerForm />
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
