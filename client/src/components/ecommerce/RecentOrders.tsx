import { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Badge from "../ui/badge/Badge";

interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  status: "Verified" | "Pending" | "Flagged";
  image: string;
}

const employeeData: Employee[] = [
  { id: 1, name: "John Doe", role: "Software Engineer", department: "IT", status: "Verified", image: "/images/product/product-01.jpg" },
  { id: 2, name: "Jane Smith", role: "HR Manager", department: "HR", status: "Pending", image: "/images/product/product-02.jpg" },
  { id: 3, name: "Alice Johnson", role: "Accountant", department: "Finance", status: "Flagged", image: "/images/product/product-03.jpg" },
  { id: 4, name: "Robert Brown", role: "Marketing Manager", department: "Marketing", status: "Verified", image: "/images/product/product-04.jpg" },
  { id: 5, name: "Emily Davis", role: "Intern", department: "IT", status: "Pending", image: "/images/product/product-05.jpg" },
];

export default function EmployeeList() {
  const [filter, setFilter] = useState<string | null>(null);

  const filteredData = filter ? employeeData.filter((emp) => emp.status === filter) : employeeData;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Employee Verification</h3>
        <div className="flex items-center gap-8">
          <button onClick={() => setFilter(null)} className={`btn ${filter === null ? "bg-gray-200 p-2 rounded-md" : ""}`}>All Employees</button>
          <button onClick={() => setFilter("Verified")} className={`btn ${filter === "Verified" ? "bg-gray-200 p-2 rounded-md" : ""}`}>✅ Verified</button>
          <button onClick={() => setFilter("Pending")} className={`btn ${filter === "Pending" ? "bg-gray-200 p-2 rounded-md" : ""}`}>⚠️ Pending</button>
          <button onClick={() => setFilter("Flagged")} className={`btn ${filter === "Flagged" ? "bg-gray-200 p-2 rounded-md" : ""}`}>🚨 Flagged</button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 text-gray-500 text-start">Employee</TableCell>
              <TableCell isHeader className="py-3 text-gray-500 text-start">Role</TableCell>
              <TableCell isHeader className="py-3 text-gray-500 text-start">Department</TableCell>
              <TableCell isHeader className="py-3 text-gray-500 text-start">Status</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredData.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="py-3 flex items-center gap-3">
                  <img src={employee.image} className="h-[50px] w-[50px] rounded-md" alt={employee.name} />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white/90">{employee.name}</p>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500">{employee.role}</TableCell>
                <TableCell className="py-3 text-gray-500">{employee.department}</TableCell>
                <TableCell className="py-3">
                  <Badge color={employee.status === "Verified" ? "success" : employee.status === "Pending" ? "warning" : "error"}>
                    {employee.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
