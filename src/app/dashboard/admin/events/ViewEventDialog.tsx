import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Calendar, Users, TrendingUp, ExternalLink, Clock, AlertCircle, Tag, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ViewEventDialogProps {
  event: {
    heading: string;
    description: string;
    targetFamilies: number;
    schemeDetails: string;
    address: string;
    date: string;
    time: string;
    priority: string;
    type: string;
    status: string;
    selectedTags?: string[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ViewEventDialog({ event, isOpen, onClose }: ViewEventDialogProps) {
  const router = useRouter();

  if (!event) return null;

  const handleViewInEvents = () => {
    router.push('/events');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[85vh] overflow-y-auto bg-white rounded-xl shadow-xl">
        <DialogHeader className="pb-6 border-b">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <DialogTitle className="text-2xl font-semibold text-gray-900">{event.heading}</DialogTitle>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 text-sm font-medium">
                    <Building2 className="w-4 h-4" /> {event.type}
                  </span>
                  {event.selectedTags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium"
                    >
                      <Tag className="w-4 h-4" /> {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                  event.priority === 'High'
                    ? 'bg-red-100 text-red-800'
                    : event.priority === 'Medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {event.priority} Priority
              </span>
            </div>

            <div className="p-5 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 whitespace-pre-wrap text-base leading-relaxed">{event.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Location Details</h3>
                  <div className="flex items-start gap-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <span className="text-base">{event.address}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Target Audience</h3>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-base">{event.targetFamilies} families</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Scheme Information</h3>
                  <div className="flex items-start gap-3 text-gray-700">
                    <TrendingUp className="w-5 h-5 text-gray-400 mt-0.5" />
                    <span className="text-base">{event.schemeDetails}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Date & Time</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span className="text-base">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span className="text-base">{event.time}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Status</h3>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                    <span className="capitalize text-base text-gray-700">{event.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleViewInEvents}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-flex items-center gap-2"
          >
            View in Events <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
