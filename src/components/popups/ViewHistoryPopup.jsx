import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Star, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const ViewHistoryPopup = ({ isOpen, onClose }) => {
  const rentalHistory = [
    {
      id: 1,
      car: "BMW X3",
      pickup: "2024-01-01",
      return: "2024-01-05",
      location: "Mumbai Central",
      status: "Completed",
      rating: 5
    },
    {
      id: 2,
      car: "Honda City",
      pickup: "2023-12-15",
      return: "2023-12-18",
      location: "Pune Airport",
      status: "Completed",
      rating: 4
    },
    {
      id: 3,
      car: "Toyota Fortuner",
      pickup: "2023-11-20",
      return: "2023-11-25",
      location: "Mumbai Central",
      status: "Completed",
      rating: 5
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Rental History
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rentalHistory.map((rental) => (
                    <motion.div
                      key={rental.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-border rounded-lg p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{rental.car}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {rental.location}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary">
                                {rental.status}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs">{rental.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {rental.pickup} - {rental.return}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {(new Date(rental.return) - new Date(rental.pickup)) / (1000 * 60 * 60 * 24)} days
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {rentalHistory.length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No rental history found</p>
                  </div>
                )}

                <div className="flex gap-2 pt-6">
                  <Button variant="outline" className="flex-1" onClick={onClose}>
                    Close
                  </Button>
                  <Button className="flex-1">
                    Export History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
