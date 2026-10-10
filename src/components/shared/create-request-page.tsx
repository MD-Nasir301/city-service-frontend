import { CreateServiceRequestForm } from "@/components/form/create-service-request-form";

export default function CreateRequestPage() {
  return (
    <div className="container mx-auto px-4 py-6 md:px-8 md:py-8 max-w-5xl">
      <div className="space-y-1 rounded-2xl p-3 shadow-md shadow-blue-200 mb-5">
        <h2 className="text-2xl sm:text-3xl font-extrabold border-l-8 border-orange-400 pl-3 text-green-500 my-2">
          Create Service Request
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          Submit a new service request or complaint to get assistance.
        </p>
      </div>

      <div className="w-full">
        <CreateServiceRequestForm />
      </div>
    </div>
  );
}