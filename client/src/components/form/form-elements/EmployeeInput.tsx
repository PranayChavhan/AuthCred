import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import { EnvelopeIcon } from "../../../icons";

export default function EmployeeInput() {
  return (
    <ComponentCard title="Employee Details">
      <div className="space-y-6">
        <div>
          <Label>Employee Name</Label>
          <Input
            type="text"
            value="Pranay Chavhan"
         
            className="bg-gray-100 dark:bg-gray-800"
          />
        </div>
        <div>
          <Label>Email</Label>
          <div className="relative">
            <Input
              type="text"
              value="chavhanpranay48@gmail.com"
             
              className="pl-[62px] bg-gray-100 dark:bg-gray-800"
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <EnvelopeIcon className="size-6" />
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="bg-brand-500 text-white px-6 py-2 rounded-lg my-6">Get Started</button>
        </div>
      </div>
    </ComponentCard>
  );
}
