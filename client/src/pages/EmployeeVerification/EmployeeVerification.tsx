/* eslint-disable @typescript-eslint/no-unused-vars */

import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DropzoneComponent from "../../components/form/form-elements/DropZone";
import EmployeeInput from "../../components/form/form-elements/EmployeeInput";

export default function EmployeeVerification() {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
            <DropzoneComponent/>
            

        </div>

        <div className="col-span-12 xl:col-span-5">
        <EmployeeInput/>
            

        </div>

        

        <div className="col-span-12">
          <RecentOrders/>
        </div>
        
      </div>
    </>
  );
}
