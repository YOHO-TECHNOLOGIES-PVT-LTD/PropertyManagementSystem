"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  IndianRupeeIcon,
  Plus,
  Loader2,
  Wrench,
} from "lucide-react";
import imageUrl from "../../assets/cardimg1.png";
import imageUrl2 from "../../assets/cardimg2.png";
import person from "../../assets/person.png";
import NewRequestForm from "./NewRequestForm";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "../ui/badge";

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  assignedTo: string;
  assignedToAvatar?: string;
  created: string;
  scheduled?: string;
  completed?: string;
  estimatedCost: number;
  actualCost?: number;
  status: "Open" | "In Progress" | "Completed" | "Urgent";
  priority: "Low" | "Medium" | "High";
}

const mockRequests: MaintenanceRequest[] = [
  {
    id: "1",
    title: "Kitchen Sink Leakage",
    description:
      "The Kitchen Sink Is Leaking From The Bottom. Water Is Dripping Continuously And Needs Immediate Attention.",
    category: "Plumbing",
    assignedTo: "Mike Wilson - A/C",
    assignedToAvatar: person,
    created: "Feb 5, 2024",
    scheduled: "Feb 10, 2024",
    estimatedCost: 2500,
    status: "Completed",
    priority: "High",
  },
  {
    id: "2",
    title: "Air Conditioner Not Working",
    description:
      "The AC In The Bedroom Is Not Cooling Properly. It Turns On But No Cool Air Is Coming Out.",
    category: "HVAC",
    assignedTo: "",
    assignedToAvatar: person,
    created: "Feb 7, 2024",
    scheduled: "Feb 15, 2024",
    estimatedCost: 3500,
    status: "Completed",
    priority: "Medium",
  },
  {
    id: "3",
    title: "Electrical Outlet Not Working",
    description:
      "The Power Outlet In The Living Room Is Not Working. Multiple Devices Tested, No Power Output.",
    category: "Electrical",
    assignedTo: "Mike Johnson - Unit 304",
    assignedToAvatar: person,
    created: "Feb 9, 2024",
    estimatedCost: 1500,
    status: "Completed",
    priority: "High",
  },
  {
    id: "4",
    title: "Bathroom Door Lock Repair",
    description:
      "The Bathroom Door Lock Is Stuck And Cannot Be Opened From Inside.",
    category: "General",
    assignedTo: "Tom Brown - Handyman",
    assignedToAvatar: person,
    created: "Feb 6, 2024",
    completed: "Feb 6, 2024",
    estimatedCost: 750,
    actualCost: 750,
    status: "Completed",
    priority: "Low",
  },
    {
    id: "4",
    title: "Bathroom Door Lock Repair",
    description:
      "The Bathroom Door Lock Is Stuck And Cannot Be Opened From Inside.",
    category: "General",
    assignedTo: "Tom Brown - Handyman",
    assignedToAvatar: person,
    created: "Feb 6, 2024",
    completed: "Feb 6, 2024",
    estimatedCost: 750,
    actualCost: 750,
    status: "Completed",
    priority: "Low",
  },
];

// Custom component for a styled statistic card
const StatCard = ({
  title,
  value,
  icon,
  className,
  image,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className: string;
  image: string;
}) => (
  <Card
    className={`relative overflow-hidden ${className} transition-all duration-300 hover:shadow-xl`}
  >
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
    <CardContent className="p-4 relative z-10 flex items-center gap-3">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="p-3 rounded-xl bg-background/50 backdrop-blur-sm"
      >
        {icon}
      </motion.div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <motion.p
          className="text-2xl font-bold text-foreground"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {value}
        </motion.p>
      </div>
    </CardContent>
  </Card>
);

export default function MaintenanceDashboard() {
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [requests, setRequests] = useState<MaintenanceRequest[]>(mockRequests);

  const stats = {
    total: requests.length,
    totalCost: requests.reduce((sum, r) => sum + r.estimatedCost, 0),
  };

  const handleNewRequestSubmit = (
    newRequest: Omit<
      MaintenanceRequest,
      "id" | "created" | "assignedToAvatar" | "status"
    >
  ) => {
    const newId = (requests.length + 1).toString();
    const createdDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const requestToAdd: MaintenanceRequest = {
      ...newRequest,
      id: newId,
      created: createdDate,
      assignedToAvatar: person,
      status: "Completed",
      assignedTo: "",
    };

    setRequests([...requests, requestToAdd]);
    setShowNewRequestModal(false);
  };

  const getStatusColors = (status: MaintenanceRequest["status"]) => {
    switch (status) {
      case "Open":
        return {
          bg: "bg-gray-100 text-gray-600 border-gray-200",
          icon: <Clock className="w-4 h-4 text-gray-500" />,
        };
      case "In Progress":
        return {
          bg: "bg-yellow-100 text-yellow-600 border-yellow-200",
          icon: <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />,
        };
      case "Completed":
        return {
          bg: "bg-green-100 text-green-600 border-green-200",
          icon: <CheckCircle className="w-4 h-4 text-green-500" />,
        };
      case "Urgent":
        return {
          bg: "bg-red-100 text-red-600 border-red-200",
          icon: <AlertCircle className="w-4 h-4 text-red-500" />,
        };
      default:
        return {
          bg: "bg-gray-100 text-gray-600 border-gray-200",
          icon: <Wrench className="w-4 h-4 text-gray-500" />,
        };
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Maintenance Service
          </h1>
          <p className="text-gray-600 mt-1">
            Track and manage all property maintenance requests in one place.
          </p>
        </div>
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white flex gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => setShowNewRequestModal(true)}
        >
          <Plus className="w-4 h-4" />
          New Request
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 gap-4 mb-8"
      >
        <StatCard
          title="Total"
          value={stats.total}
          icon={<Wrench className="w-5 h-5 text-purple-600" />}
          className="bg-white border-purple-200"
          image={imageUrl}
        />
        <StatCard
          title="Est. Cost"
          value={`₹${stats.totalCost.toLocaleString()}`}
          icon={<IndianRupeeIcon className="w-5 h-5 text-blue-600" />}
          className="bg-white border-blue-200"
          image={imageUrl2}
        />
      </motion.div>

      {/* Request Cards Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-afacad"
      >
        <AnimatePresence>
          {requests.map((request) => {
            const { icon } = getStatusColors(request.status);

            return (
              <motion.div
                key={request.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              >
                <Card className="w-full shadow-[0px_0px_15px_rgba(0,0,0,0.05)] rounded-[16px] hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-purple-300 group">
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Header Section */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-14 h-14 border-2 border-purple-500 shadow-md">
                          <AvatarImage
                            src={request.assignedToAvatar || "/placeholder.svg"}
                          />
                          <AvatarFallback className="bg-purple-100 text-purple-600 font-bold">
                            {request.title
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-bold leading-tight text-gray-900 group-hover:text-purple-600 transition-colors">
                            {request.title}
                          </h3>
                          <p className="text-sm text-gray-500 font-medium mt-1">
                            {request.assignedTo || "Unassigned"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed flex-1">
                      {request.description}
                    </p>

                    {/* Details Card */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                     className="bg-gradient-to-r from-[rgb(240,240,240)] to-[rgb(220,220,220)] rounded-xl p-5 mb-6 shadow-inner"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">
                            Category
                          </span>
                          <span className="font-semibold text-gray-900">
                            {request.category}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          {/* <span className="text-sm text-gray-500">
                            Priority
                          </span> */}
                          <Badge
                            className={`w-fit text-xs font-semibold uppercase px-2 py-1 ${
                              request.priority === "High"
                                ? "bg-red-100 text-red-600"
                                : request.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-600"
                                : "bg-green-100 text-green-600"
                            }`}
                          >
                            {request.priority}
                          </Badge>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">Created</span>
                          <span className="font-semibold text-gray-900">
                            {request.created}
                          </span>
                        </div>
                        {request.scheduled && (
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">
                              Scheduled
                            </span>
                            <span className="font-semibold text-gray-900">
                              {request.scheduled}
                            </span>
                          </div>
                        )}
                        <div className="flex flex-col col-span-2 mt-2">
                          <span className="text-sm text-gray-500">
                            {request.actualCost
                              ? "Actual Cost"
                              : "Estimated Cost"}
                          </span>
                          <div className="flex items-center gap-2">
                            <IndianRupeeIcon className="w-5 h-5 text-gray-600" />
                            <span className="text-xl font-bold text-gray-900">
                              {(
                                request.actualCost || request.estimatedCost
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Status Button and Message */}
                    <div className="flex flex-col items-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full"
                      >
                        <Button
                          className={`w-full h-[45px] text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white`}
                        >
                          {icon}
                          Completed
                        </Button>
                      </motion.div>
                      <p className="text-sm text-gray-500 mt-2 text-center italic">
                        {request.completed
                          ? `"Completed on ${request.completed}"`
                          : '"Task has been completed"'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {showNewRequestModal && (
          <NewRequestForm
            onClose={() => setShowNewRequestModal(false)}
            onSubmit={handleNewRequestSubmit}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
