import Spinner from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16 md:pt-20">
      <Spinner size="lg" />
    </div>
  );
}
