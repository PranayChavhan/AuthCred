/* eslint-disable @typescript-eslint/no-unused-vars */

// import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
// import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
// import RecentOrders from "../../components/ecommerce/RecentOrders";
import RecentOrders from "../../components/ecommerce/RecentOrders";


export default function ReportsAndAnalytics() {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12">
                  <RecentOrders />
                </div>

        

        
        
      </div>
    </>
  );
}
