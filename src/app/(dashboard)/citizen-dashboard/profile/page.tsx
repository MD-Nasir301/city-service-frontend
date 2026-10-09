import { HardHat } from "lucide-react"; // lucide-react আইকন ব্যবহার করলে

export default function UnderConstructionPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="bg-amber-100 dark:bg-amber-950/30 p-4 rounded-full mb-4">
        <HardHat className="w-12 h-12 text-amber-600 dark:text-amber-500" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        Page Under Development. Coming Soon . . .
      </h1>
    </div>
  );
}
