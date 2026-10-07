import { CreateServiceRequestForm } from "@/components/form/create-service-request-form";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl text-center text-blue-400 ">
        This is the Create Service Request Page.

     <CreateServiceRequestForm/>
      </h1>
    </div>
  );
}
